import React, { useEffect, useRef, useState } from "react";
import styles from "./prepopulateReceiptForm.module.scss";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import QrCodeReader from "../../qr-code-reader/QrCodeReader";
import axios from "axios";
import { populateScanResults } from "../../../utils/function/api/receipt";

interface Props {
  onDataRetrieved: (data: any) => void;
}

function PrepopulateReceiptForm({onDataRetrieved}:Props) {
  const [formState, setFormState] = useState({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const isRetrievingData = useRef(false);

  useEffect(() => {
    // if (videoRef.current && canvasRef.current) {
    //   getVideo();
    // }
  }, [videoRef, canvasRef]);

  async function setup() {
    try {
      const devices = await Html5Qrcode.getCameras();
      let cameraId;
      if (devices && devices.length) {
        cameraId = devices[0].id;
      }

      const html5QrCode = new Html5Qrcode("reader");
      if (!cameraId) throw "No camera found";
      await html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        (decodedText, decodedResult) => {
          console.log(decodedText, decodedResult);
        },
        (errorMessage) => {
          console.error(errorMessage);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (readerRef.current) {
      setup();
    }
  }, [readerRef]);

  function onNewScanResult(decodedText: string) {
    if(isRetrievingData.current) return;
    isRetrievingData.current = true;
    fetchReceiptData(decodedText);
    // handle decoded results here
  }

  async function fetchReceiptData(url: string){
    console.log(url);
    try {
        const receiptData = await populateScanResults(url);
        onDataRetrieved(receiptData.data);
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  return (
    <div className={styles.prepopulateReceiptModal}>
      <h1 className="text-center mb-2">Scan your receipt</h1>
      <QrCodeReader
        fps={10}
        qrbox={360}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default PrepopulateReceiptForm;
