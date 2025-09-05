import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrDemo() {
  const [qrValue, setQrValue] = useState("https://sih-demo.com/verify");
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  // Start Scanner when user clicks "Start Scan"
  const startScanner = () => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    }, false);

    scanner.render(
      (decodedText: string) => {
        setScannedResult(decodedText);
        scanner.clear(); // stop after one successful scan
      },
      (errorMessage: string) => {
        console.log("Scan error:", errorMessage);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>QR Demo 🚀</h1>

      {/* QR Code Generator */}
      <div style={{ margin: "20px" }}>
        <h2>Generate QR</h2>
        <input
          type="text"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
          placeholder="Enter text or URL"
          style={{ padding: "8px", width: "300px" }}
        />
        <div style={{ marginTop: "20px" }}>
          <QRCodeCanvas value={qrValue} size={200} />
        </div>
      </div>

      <hr style={{ margin: "40px" }} />

      {/* QR Scanner */}
      <div style={{ margin: "20px" }}>
        <h2>Scan QR</h2>
        <button
          onClick={startScanner}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start Scan
        </button>
        <div id="reader" style={{ width: "300px", margin: "20px auto" }}></div>

        {scannedResult && (
          <p>
            ✅ Scanned Result: <strong>{scannedResult}</strong>
          </p>
        )}
      </div>
    </div>
  );
}