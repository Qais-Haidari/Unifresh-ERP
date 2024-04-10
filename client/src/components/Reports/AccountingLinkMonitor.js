import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function AccountingLinkMonitor() {
    const [JL, setJL] = useState("");
    const [JLSales, setJLSales] = useState("");
    const [JLPurchase, setJLPurchase] = useState("");
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        axios
      .get(`http://10.0.0.140:5000/Ostendo/AccountingLinkMonitor_JournalHeader`)
      .then((res) => {
        setJL(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
        axios
      .get(`http://10.0.0.140:5000/Ostendo/AccountingLinkMonitor_JournalHeaderPurchase`)
      .then((res) => {
        setJLPurchase(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
        axios
      .get(`http://10.0.0.140:5000/Ostendo/AccountingLinkMonitor_JournalHeaderSales`)
      .then((res) => {
        setJLSales(res.data);
        setloading(false)
      })
      .catch((err) => (document.body.innerHTML = err));
    }, []);
    if (!JLSales || !JL || !JLPurchase) {
        return (
          <></>
        );
      } else {
  return (
    <div>
      <p className='mb-4 text-xl font-extrabold text-white dark:text-white md:text-3xl text-center' >Accounting Link Monitor</p>
    <div className='grid grid-cols-3 m-2 gap-1'>
      <a href='#/AccountLinkMonitor/Payments' class="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 border border-blue-700 rounded">Payments ( {JL[0].COUNT} )</a>
      <a href='#/AccountLinkMonitor/Purcahse' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-center">Purchase ( {JLPurchase[0].LPI_COUNT} )</a>
      <a href='#/AccountLinkMonitor/Sales' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 text-center rounded">Sales ( {JLSales[0].LSI_COUNT} )</a>
    </div>
    </div>
  )
}
}
