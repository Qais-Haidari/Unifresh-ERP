import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment'

export default function AccountingLinkMonitor() {
    const [ButtonValue, setButtonValue] = useState('State');
    const [Target, setTarget] = useState('');
    const [Time, setTime] = useState('');
    const [state, setstate] = useState([]);
    useEffect(() => {
    }, []);

    function GetState(state){
      setTarget(state)
      axios
      .get(`http://localhost:5000/Ostendo/Schedule/Change/Customers/${state}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    }
    function Update(){
      console.log(Target)
      console.log(Time)
      axios
      .get(`http://localhost:5000/Ostendo/${state}`)
      .then((res) => {
        setstate(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    }
    if(!state){
      return (<></>)
    }else {
  return (
    <div>
      <div className="flex w-full h-full flex-1 flex-col justify-center">
        <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
            <div>
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" onClick={() => setButtonValue('State')} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                  State
                </button>
              </div>

              <div className="mt-2">
                {
                  ButtonValue === 'State' ? ( 
                    <select
                      onClick={(e) => { GetState(e.target.value) }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>SA</option>
                      <option>WA</option>
                    </select>
                   ) : (<></>)
                }
                {
                  ButtonValue === 'RunNumber' ? ( 
                    <input
                      type='number'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                   ) : (<></>)
                }
                {
                  ButtonValue === 'DeliveryDay' ? ( 
                    <input
                      id="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                   ) : (<></>)
                }
              </div>
            </div>
            <div className='mt-12' >
              <div className="flex -mt-4 items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Cut Of Time ( 12 houre format not accept )
                </label>
              </div>
              <div className="mt-2">
                {Time}
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => Update()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
        </div>
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-md font-semibold text-gray-700 capitalize tracking-wider">
                    Customer ({state.length})
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.map((r) => (
                  <tr>
                    <td className="px-5 py-2 border-b border-gray-200  text-sm">
                      <p className=" whitespace-no-wrap">
                        {r.CUSTOMER}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}
}