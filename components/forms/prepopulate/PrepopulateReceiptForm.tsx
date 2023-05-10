import React, { useEffect, useRef, useState } from "react";
import styles from "./prepopulateReceiptForm.module.scss";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import QrCodeReader from "../../qr-code-reader/QrCodeReader";
import axios from "axios";
import { populateScanResults } from "../../../utils/function/api/receipt";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../../../utils/function/common";

interface Props {
  onDataRetrieved: (data: any) => void;
}

function PrepopulateReceiptForm({onDataRetrieved}:Props) {
  const isRetrievingData = useRef(false);

  function onNewScanResult(decodedText: string) {
    if(isRetrievingData.current) return;
    isRetrievingData.current = true;
    fetchReceiptData(decodedText);
  }

  async function fetchReceiptData(url: string){
    try {
        const receiptData = await populateScanResults(url);
        onDataRetrieved(receiptData.data);
    } catch (error) {
      toast.error(getResponseErrorMessage(error));
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
