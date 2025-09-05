// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');
require('dotenv').config();

const { addBatch, addEvent, confirmDelivery, payFarmer, readBatch } = require('./blockchain');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/batch', async (req, res) => {
  try {
    const { batchId, farmerAddr, cropType, harvestDate, location, priceEth } = req.body;
    if(!batchId || !farmerAddr) return res.status(400).json({ error: 'batchId and farmerAddr required' });

    const meta = { farmerAddr, cropType, harvestDate, location, priceEth };
    const { batch, txHash } = await addBatch(batchId, meta);
    const qr = await QRCode.toDataURL(batchId);
    res.json({ ok: true, batch, qr, txHash });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/event', async (req, res) => {
  try {
    const { batchId, event } = req.body;
    if(!batchId || !event) return res.status(400).json({ error: 'batchId and event required' });
    const { txHash } = await addEvent(batchId, event);
    res.json({ ok: true, txHash });
  } catch (e){ res.status(500).json({ error: e.message }); }
});

app.get('/api/batch/:id', async (req, res) => {
  try {
    const batch = readBatch(req.params.id);
    if(!batch) return res.status(404).json({ error: 'not found' });
    res.json(batch);
  } catch (e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/delivery', async (req, res) => {
  try {
    const { batchId } = req.body;
    const txHash = await confirmDelivery(batchId);
    res.json({ ok: true, txHash });
  } catch (e){ res.status(500).json({ error: e.message }); }
});

app.post('/api/pay', async (req, res) => {
  try {
    const { batchId, priceEth } = req.body;
    const txHash = await payFarmer(batchId, priceEth);
    res.json({ ok: true, txHash });
  } catch (e){ res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend listening on http://localhost:${PORT}`));
