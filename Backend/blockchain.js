// backend/blockchain.js
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.json');

// Simple JSON DB helpers
function loadDB(){
  if(!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ batches: {} }, null, 2));
  return JSON.parse(fs.readFileSync(DB_PATH));
}
function saveDB(db){ fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); }

// Setup provider & wallet (read from .env)
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Write a small proof (hash) to chain (tx.data = keccak256(JSON))
async function recordEventOnChain(eventObj){
  const json = JSON.stringify(eventObj);
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(json)); // 0x...
  const tx = await wallet.sendTransaction({
    to: wallet.address, // self-transfer; store hash in data
    value: 0,
    data: hash
  });
  const receipt = await tx.wait();
  return receipt.transactionHash;
}

// CRUD functions
async function addBatch(batchId, payload){
  const db = loadDB();
  if(db.batches[batchId]) throw new Error('Batch exists');
  const batch = {
    batchId,
    meta: payload,
    events: [],
    chainProofs: []
  };
  const txHash = await recordEventOnChain({ action: 'addBatch', batchId, meta: payload });
  batch.chainProofs.push({ action: 'addBatch', txHash, timestamp: Date.now() });
  db.batches[batchId] = batch;
  saveDB(db);
  return { batch, txHash };
}

async function addEvent(batchId, event){
  const db = loadDB();
  const batch = db.batches[batchId];
  if(!batch) throw new Error('Batch not found');
  batch.events.push(event);
  const txHash = await recordEventOnChain({ action: 'addEvent', batchId, event });
  batch.chainProofs.push({ action: 'addEvent', txHash, timestamp: Date.now() });
  saveDB(db);
  return { event, txHash };
}

async function confirmDelivery(batchId){
  const db = loadDB();
  const batch = db.batches[batchId];
  if(!batch) throw new Error('Batch not found');
  batch.meta.delivered = true;
  const txHash = await recordEventOnChain({ action: 'confirmDelivery', batchId, timestamp: Date.now() });
  batch.chainProofs.push({ action: 'confirmDelivery', txHash, timestamp: Date.now() });
  saveDB(db);
  return txHash;
}

// For demo: server wallet sends MATIC to farmer address
async function payFarmer(batchId, priceEth){
  const db = loadDB();
  const batch = db.batches[batchId];
  if(!batch) throw new Error('Batch not found');
  if(!batch.meta || !batch.meta.farmerAddr) throw new Error('Farmer address missing');

  const value = ethers.utils.parseEther(String(priceEth)); // priceEth = "0.001" etc
  const tx = await wallet.sendTransaction({
    to: batch.meta.farmerAddr,
    value
  });
  const receipt = await tx.wait();
  batch.meta.paid = true;
  batch.meta.paymentTx = receipt.transactionHash;
  batch.chainProofs.push({ action: 'payFarmer', txHash: receipt.transactionHash, amountEth: priceEth, timestamp: Date.now() });
  saveDB(db);
  return receipt.transactionHash;
}

function readBatch(batchId){
  const db = loadDB();
  return db.batches[batchId] || null;
}

module.exports = { addBatch, addEvent, confirmDelivery, payFarmer, readBatch, provider, wallet };
