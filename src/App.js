import { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const qrCodeRef = useRef(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleDownload() {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.download = "qrcode.png";
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("Error generating QR code image", error);
        });
    }
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div ref={qrCodeRef}>
        <QRCode value={text} />
      </div>
      <div className="input-here">
        <p>Enter Your Text Here</p>
        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default App;
