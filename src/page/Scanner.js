import React, { useState, useEffect } from "react";
import Quagga from "quagga";
function BarcodeScanner() {
  const [scannedBarcode, setScannedBarcode] = useState("");

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 300,
            height: 300,
            facingMode: "environment", // Use the rear camera (if available)
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setScannedBarcode(data.codeResult.code);
      Quagga.stop();
    });

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, []);

  return (
    
            <div>
            <div id="scanner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
            <p>Scanned Barcode: {scannedBarcode}</p>
          </div>
  );
}

export default BarcodeScanner;
