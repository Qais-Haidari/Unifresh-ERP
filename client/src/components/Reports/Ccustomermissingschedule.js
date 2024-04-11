import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";

export default function Ccustomermissingschedule() {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  const [Name, setName] = useState('');
  const [sec, setsec] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:5000/Ostendo/SchedulesNames`)
      .then((res) => {
        setstate(res.data);
        setloading(false);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const Action = (e) => {
    setloading(true)
    axios
      .get(`http://10.0.0.140:5000/Ostendo/MissingCustomerSchedules/${Name}`)
      .then((res) => {
        setsec(res.data);
        setloading(false)
      })
      .catch((err) => (document.body.innerHTML = err));
  }

  if (loading === true) {
    return (
      <Layout>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex">
        <select
            id="location"
            name="location"
            onChange={ (a) => { setName(a.target.value) } }
            className="mt-2 block w-60 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
            <option></option>
            {state.map((e) => (<option>{e.SCHEDULENAME}</option>))}
        </select>
        <button onClick={() => Action()} className="rounded bg-indigo-600 px-4 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Action</button>
        </div>
        <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      GRIDUNIQUEINDEX
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    CUSTOMER
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    SCHEDULENAME
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    FOUND
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    CUSTOMERGROUP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sec.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.GRIDUNIQUEINDEX}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CUSTOMER}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.SCHEDULENAME}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.FOUND}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.CUSTOMERGROUP}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            </div>
            </div>
      </Layout>
    );
  }
}
