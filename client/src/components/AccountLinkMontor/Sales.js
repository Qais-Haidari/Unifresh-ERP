import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Payments() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
  .get(`http://10.0.0.129:5000/Ostendo/AccountingLinkMonitor_JournalHeaderSales_Statment`)
  .then((res) => {
    setstate(res.data);
    console.log(res.data)
  })
  .catch((err) => (document.body.innerHTML = err));
}, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">APPLYTOINVOICE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">APPLYTOINVOICENUMBER</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">BATCHFILENO</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">COMPANYINVNUMBER</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">COMPANYNAME</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">CREDITTERM</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">CURRENCYCODE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">EXCHANGERATE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">EXTERNALCREDITTERM</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">EXTERNALERROR</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">EXTERNALINVOICEID</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICEDATE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICEDUEDATE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICENETTTOTAL</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICENUMBER</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICEREFERENCE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICESELECTED</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICETAXTOTAL</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICETOTAL</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">INVOICETYPE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALNUMBER</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">LEDGERCODESMISSING</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">RETRYCOUNT</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SYSDATECREATED</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SYSDATEMODIFIED</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SYSUNIQUEID</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SYSUSERCREATED</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SYSUSERMODIFIED</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">TRANSACTIONMESSAGE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">TRANSACTIONSTATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.APPLYTOINVOICE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.APPLYTOINVOICENUMBER}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.BATCHFILENO}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.COMPANYINVNUMBER}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.COMPANYNAME}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CREDITTERM}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CURRENCYCODE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.EXCHANGERATE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.EXTERNALCREDITTERM}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.EXTERNALERROR}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.EXTERNALINVOICEID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEDATE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEDUEDATE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICENETTTOTAL}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICENUMBER}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEREFERENCE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICESELECTED}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICETAXTOTAL}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICETOTAL}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICETYPE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALNUMBER}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.LEDGERCODESMISSING}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.RETRYCOUNT}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SYSDATECREATED}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SYSDATEMODIFIED}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SYSUNIQUEID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SYSUSERCREATED}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SYSUSERMODIFIED}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.TRANSACTIONMESSAGE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.TRANSACTIONSTATUS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}