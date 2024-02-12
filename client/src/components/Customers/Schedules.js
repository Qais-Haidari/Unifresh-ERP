import React, { useState, useEffect } from 'react'
import Layout from "../../Layout";
import axios from "axios";
import { Link,  useParams} from "react-router-dom";

export default function Schedules() {
const [state, setstate] = useState();
const [Loading, setLoading] = useState(false);
const { id } = useParams();
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `http://10.0.0.129:5000/Customer/Schedules/${id}`
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
      <div className="">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300" id='myTable' >
                  <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CUSTOMER</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CUST_DELIVERY_STATE</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CUTOFFDAY</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">CUTOFFTIME</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DELIVERYDAY</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DISPATCHDAY</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SCHEDULENUMBER</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SYSDATECREATED</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SYSDATEMODIFIED</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SYSUSERCREATED</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SYSUSERMODIFIED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((r) => (
                      <tr>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.CUSTOMER}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.CUST_DELIVERY_STATE}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.CUTOFFDAY}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.CUTOFFTIME}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.DELIVERYDAY}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.DISPATCHDAY}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SCHEDULENUMBER}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SYSDATECREATED}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SYSDATEMODIFIED}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SYSUSERCREATED}</td>
                        <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SYSUSERMODIFIED}</td>
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
