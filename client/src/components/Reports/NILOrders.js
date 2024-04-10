import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";

export default function MissedSaleOrder() {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://10.0.0.140:5000/Users`)
      .then((res) => {
        setstate(res.data);
        setloading(false);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  if (loading === true) {
    return (
      <Layout>
        <p>Loading</p>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 text-sm">
                          DISPATCHDAY
                        </th>
                        {/* <th scope="col" className="px-3 py-3.5 ">
                          CORRECTINV
                        </th> */}
                        <th scope="col" className="px-3 py-3.5 text-sm">
                          ORIGDISP
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-sm">
                          ORIGDISPINVOICE
                        </th>
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          CUSTOMER
                        </th>
                        {/* <th scope="col" className="py-3.5 pl-3 text-sm">
                          SCHEDULEDCHANGE
                        </th> */}
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          CUSTOMERPHONE
                        </th>
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          CUSTOMERMOBILE
                        </th>
                        {/* <th scope="col" className="py-3.5 pl-3 ">
                          CUSTOMERSTATUS
                        </th> */}
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          SMETHOD
                        </th>
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          SCHEDGROUP
                        </th>
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          CUTOFFDAY
                        </th>
                        <th scope="col" className="py-3.5 pl-3 text-sm">
                          CUTOFFTIME
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {state.map((person) => (
                        <tr key={person}>
                          {/* <p>{person}</p> */}
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.DISPATCHDAY}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CORRECTINV}
                          </td> */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.ORIGDISP}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.ORIGDISPINVOICE}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUSTOMER}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.SCHEDULEDCHANGE}
                          </td> */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUSTOMERPHONE}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUSTOMERMOBILE}
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUSTOMERSTATUS}
                          </td> */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.SCHEDGROUP}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.SMETHOD}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUTOFFDAY}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.CUTOFFTIME}
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
      </Layout>
    );
  }
}
