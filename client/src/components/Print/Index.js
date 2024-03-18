import React, { useState } from 'react'
import Layout from "../../Layout";


export default function Index() {
    const [query, setquery] = useState('initialState');
  return (
    <Layout>
      <h1 className="text-center text-lg text-white mt-2" >Print Invoices in PDF format</h1>
      <div className="w-56" >
      <label htmlFor="location" className="block text-sm font-medium leading-6 text-white">
        Select Query Type
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setquery(e.target.value)}
      >
        <option></option>
        <option value='date' >By Date</option>
        <option value='customer' >By Customer Name</option>
        <option value='invoice' >By Invoice Number</option>
      </select>

        {
            query === 'date' ? (
                <>
                    <div class="relative max-w-sm mt-1">
                    <input type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>
                </>
            ) : <></>
        }
        {
            query === 'invoice' ? (
                <>
                    <div class="relative max-w-sm mt-1">
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Invoice Number" />
                    </div>
                </>
            ) : <></>
        }
        {
            query === 'customer' ? (
                <>
                    <div class="relative max-w-sm mt-1">
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Name" />
                    </div>
                </>
            ) : <></>
        }

        <button
            type="button"
            className="rounded bg-indigo-600 px-5 py-1 mt-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Print</button>
    </div>
    </Layout>
  )
}
