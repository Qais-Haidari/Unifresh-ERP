import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";

export default function MissedSaleOrder() {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://10.0.0.140:5000/OrderForWrongDate`)
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
                          INVOICENUMBER
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          CUSTOMER
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          DAYNAME
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          INVOICEDATE
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          SYSUSERCREATED
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          INVOICETOTALAMOUNT
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          RUNNO
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          SHIPPINGMETHOD
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          SCHEDGROUP
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          SHORTREP
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          APPROVED
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          GRIDUNIQUEINDEX
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {state.map((person) => (
                        <tr key={person}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.INVOICENUMBER}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.CUSTOMER}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.DAYNAME}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.INVOICEDATE}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.SYSUSERCREATED}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.INVOICETOTALAMOUNT}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.RUNNO}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.SHIPPINGMETHOD}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.SCHEDGROUP}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.SHORTREP}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.APPROVED}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.GRIDUNIQUEINDEX}
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
