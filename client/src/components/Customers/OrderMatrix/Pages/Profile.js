import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName } from '../../../../Utils/Function'
import { URL } from '../../../../Utils/URL'

export default function Profile() {
  const location = useLocation();
  const [Loading, setLoading] = useState(false);
  const [Credit, setCredit] = useState();
  const [OrderItems, setOrderItems] = useState([]);
  const [state, setstate] = useState();
  const data = location.state;

  useEffect( () => {
    async function name(params) {
      setLoading(true)
      axios.get(`${URL}/Customer/Schedules/${data.id}`).then((res) => {setstate(res.data)}).catch((err) => (document.body.innerHTML = err));
      const orderlist = await axios.get(`${URL}/Users/User/OrderItem/${data.id}`)
      const Credit_check = await axios.get(`${URL}/Ostendo/Order/nilordercheck/${data.id}/${data.End}/${data.start}`)
      setCredit(Credit_check.data[0].COUNT)
      setOrderItems(orderlist.data)
      setLoading(false)
    }
    name()
  }, []);
  // console.log(data)
  if (!state || !OrderItems) {
    return (<p>Loading</p>)
  }else {
  return (
    <div className=' bg-gray-800' >
      <div className='grid grid-cols-2 space-x-2 mx-5 mb-2'>
        <div>
          <h1 className='text-white text-lg mt-2 text-center' >Shadow</h1>
          <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y border divide-gray-300">
                  <thead className="bg-gray-800">
                    <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">CUSTOMER</th>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">CUTOFFDAY</th>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">CUTOFFTIME</th>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">DELIVERYDAY</th>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">DISPATCHDAY</th>
                    </tr> 
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-800">
                    {state.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.CUSTOMER}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{NumToDayName(person.CUTOFFDAY)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.CUTOFFTIME}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{NumToDayName(person.DELIVERYDAY)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{NumToDayName(person.DISPATCHDAY)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
        </div>
        {/*  */}
        <div>
          <h1 className='text-white text-lg mt-2 text-center'>Order Details</h1>                    
          <ul className=" divide-y border p-2 mt-2 w-full rounded-md divide-gray-200 dark:divide-gray-700">
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0"><h1 className="text-md font-medium text-white truncate dark:text-white">Order Per Week</h1></div>
                  <div className="inline-flex items-center text-md font-semibold text-white dark:text-white">{OrderItems.length}</div>
                </div>
            </li>
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0"><h1 className="text-md font-medium text-white truncate dark:text-white">Nil Orders ( Subject To Quality )</h1></div>
                  <div className="inline-flex items-center text-md font-semibold text-white dark:text-white">0</div>
                </div>
            </li>
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0"><h1 className="text-md font-medium text-white truncate dark:text-white">Credit</h1></div>
                  <div className="inline-flex items-center text-md font-semibold text-white dark:text-white">{Credit}</div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
}