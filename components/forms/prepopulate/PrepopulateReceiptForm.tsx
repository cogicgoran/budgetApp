import React, { useEffect, useRef, useState } from "react";
import styles from "./prepopulateReceiptForm.module.scss";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import QrCodeReader from "../../qr-code-reader/QrCodeReader";
import axios from "axios";
import { populateScanResults } from "../../../utils/function/api/receipt";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../../../utils/function/common";

export type ISODateString = string;

export interface PrepopulateReceiptResponse {
  articles: any[];
  date: ISODateString;
  marketplaceData: {
    shopUniqueId: string;
    shopName: string;
    address: string;
    city: string;
  };
}

interface Props {
  onDataRetrieved: (data: PrepopulateReceiptResponse) => void;
}

function PrepopulateReceiptForm({ onDataRetrieved }: Props) {
  const isRetrievingData = useRef(false);

  function onNewScanResult(decodedText: string) {
    if (isRetrievingData.current) return;
    isRetrievingData.current = true;
    fetchReceiptData(decodedText);
  }

  async function fetchReceiptData(url: string) {
    try {
      const receiptData: PrepopulateReceiptResponse = await populateScanResults(
        url
      );
      onDataRetrieved(receiptData);
    } catch (error) {
      toast.error(getResponseErrorMessage(error));
    }
  }

  return (
    <div className={styles.prepopulateReceiptModal}>
      <h1 className="text-center mb-2">Scan your receipt</h1>
      <QrCodeReader
        fps={4}
        qrbox={420}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeErrorCallback={(err) => console.log(err)}
      />
    </div>
  );
}

export default PrepopulateReceiptForm;
