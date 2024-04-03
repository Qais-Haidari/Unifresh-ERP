import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Payments() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
  .get(`http://10.0.0.129:5000/Ostendo/AccountingLinkMonitor_JournalHeader_Statment`)
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">BATCHFILENO</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">CREDITTAXVALUE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">CREDITVALUE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">DEBITTAXVALUE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">DEBITVALUE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALDATE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALDESCRIPTION</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALID</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALTYPE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((person) => (
                      <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.BATCHFILENO}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CREDITTAXVALUE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CREDITVALUE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.DEBITTAXVALUE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.DEBITVALUE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALDATE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALDESCRIPTION}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALTYPE}</td>
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