import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function AccountingLinkMonitor() {
    const [JL, setJL] = useState("");
    const [JLSales, setJLSales] = useState("");
    const [JLPurchase, setJLPurchase] = useState("");
    const [OstendoUsers, setOstendoUsers] = useState([]);
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
        axios
      .get(`http://10.0.0.140:5000/Ostendo/users/ostnedo`)
      .then((res) => {
        setOstendoUsers(res.data);
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
    <p className='text-center text-2xl text-white' >If rollover users exists in this list it means rollover is working.</p>
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">USERNAME</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DATEANDTIMELOGGEDIN</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">COMPUTERNAME</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">PROCESSRESPONSE</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SESSIONTYPE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {OstendoUsers.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.USERNAME}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.DATEANDTIMELOGGEDIN}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.COMPUTERNAME}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.PROCESSRESPONSE}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SESSIONTYPE}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}
}
