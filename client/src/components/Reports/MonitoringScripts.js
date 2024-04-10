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
        <p>mon</p>
      <p className='mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl' >Accounting Link Monitor</p>
      <p className='mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl' >Journal Header: {JL[0].COUNT}</p>
      <p className='mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl' >Journal Header Purchase: {JLPurchase[0].LPI_COUNT}</p>
      <p className='mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl' >Journal Header Sales: {JLSales[0].LSI_COUNT}</p>
    </div>
  )
}
}
