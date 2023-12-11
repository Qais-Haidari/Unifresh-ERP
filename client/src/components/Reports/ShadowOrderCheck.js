import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";

export default function MissedSaleOrder() {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:5000/ShadowOrderCheck`)
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
                          ORDERNUMBER
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          REQUIREDDATE
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          ORDERDESCRIPTION
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          GRIDUNIQUEINDEX
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          CUSTOMER
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          ORDERPHONE
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          ORDERNUMBER_1
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          REQUIREDDATE_1
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          ORDERDESCRIPTION_1
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          CUSTOMER_1
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          ADDITIONALFIELD_3
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          SYSUNIQUEID
                        </th>
                        <th scope="col" className="py-3.5 text-sm">
                          INVOICEDATE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {state.map((person) => (
                        <tr key={person}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ORDERNUMBER}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.REQUIREDDATE}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ORDERDESCRIPTION}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.GRIDUNIQUEINDEX}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.CUSTOMER}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ORDERPHONE}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ORDERNUMBER_1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.REQUIREDDATE_1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ORDERDESCRIPTION_1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.CUSTOMER_1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.ADDITIONALFIELD_3}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.SYSUNIQUEID}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-6">
                            {person.INVOICEDATE}
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
