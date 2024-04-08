import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Payments() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
  .get(`http://localhost:5000/Ostendo/AccountingLinkMonitor/Hold/Get`)
  .then((res) => {
    setstate(res.data);
    console.log(res.data)
  })
  .catch((err) => (document.body.innerHTML = err));
}, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div class="inline-flex rounded-md shadow-sm mt-2">
          <a href="#/AccountLinkMonitor/Payments" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Ready to Send
          </a>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">List</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Status</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">TransactionID</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">JOURNALDESCRIPTION</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((person) => (
                      <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.List}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Status}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.TransactionID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.JOURNALDESCRIPTION}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >Ready to Send</button></td>
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