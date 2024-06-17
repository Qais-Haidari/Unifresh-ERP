import React, { useState, useEffect } from 'react'
import Layout from "../../../Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
const [state, setstate] = useState();
const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `http://10.0.0.52:5000/Web/WebOrders/get`
      )
      .then((res) => {
        setstate(res.data);
        setLoading(false)
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  console.log(state)
  if (!state) {
    return (<p>Loading</p>)
  }else {
    return (
      <Layout>
      <div>
        <h1 className='text-center text-white font-bold text-xl my-2' >Customer Web Orders</h1>
      <div className="mx-2">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Customer
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          OrderDate
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          More
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((r) => (
                      <tr>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.Customer}</td>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.OrderDate}</td>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.Date.replace(/\T00/g, " ")}</td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-red text-sm">
                          <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' to={`/Order/Web/Item/${r.OrderID}`}>Action</Link>
                        </td>
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
      </Layout>
    )
  }
}
