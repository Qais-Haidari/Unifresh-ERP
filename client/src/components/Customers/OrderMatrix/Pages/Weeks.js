import React, { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName, sortDatesIntoWeeks } from '../../../../Utils/Function'
import { URL } from '../../../../Utils/URL'
import Discloure from './Discloure'
import Profile from './Profile'
import Invoices from './Invoices';

export default function Weeks() {
  const location = useLocation();
  const data = location.state;
  const [OrderList, setOrderList] = useState();
  useEffect(() => {
    async function run(){
      const orderlist = await axios.get(`${URL}/Users/User/OrderItem/${data.id}`)
      setOrderList(orderlist.data);
    }
    run();
  }, []);
  let InvArr = [];
  for (let index = 0; index < location.state.data.length; index++) {
    const element = location.state.data[index];
    InvArr.push([element.INVOICENUMBER,element.INVOICEDATE.replace('/','-').replace('/','-')]) 
  }
  if (!OrderList) {
    return (<p>Loading</p>)
  }else {
  return (
    <div className='bg-gray-800 h-screen' >
    <div className='flex flex-1'>
    <h1 className='text-lg p-2 w-full text-white' >List</h1>
    <h1 className='text-lg p-2 w-full text-white' >Week 1</h1>
    <h1 className='text-lg p-2 w-full text-white' >Week 2</h1>
    <h1 className='text-lg p-2 w-full text-white' >Week 3</h1>
    <h1 className='text-lg p-2 w-full text-white' >Week 4</h1>
    </div>
    <div className='flex flex-1 space-x-2 mx-2 bg-gray-800'>
      <ul class="w-full text-sm font-medium bg-gray-800 mb-3 text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {OrderList.map((value) => (
        <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">{value.LINEDESCRIPTION}</li>
      ))}
        </ul>
      <ul class=" text-sm font-medium bg-gray-800 w-full mb-3 text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Discloure data={sortDatesIntoWeeks(InvArr)[0]} orderlist={OrderList} />
      </ul>
      <ul class="text-sm font-medium bg-gray-800 w-full mb-3 text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Discloure data={sortDatesIntoWeeks(InvArr)[1]} orderlist={OrderList} />
      </ul>
      <ul class="text-sm font-medium bg-gray-800 w-full mb-3 text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Discloure data={sortDatesIntoWeeks(InvArr)[2]} orderlist={OrderList} />
      </ul>
      <ul class="text-sm font-medium bg-gray-800 w-full mb-3 text-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Discloure data={sortDatesIntoWeeks(InvArr)[3]} orderlist={OrderList} />
      </ul>
    </div>
    <Invoices data={InvArr} />
    <Profile />
      </div>
  )
}
}