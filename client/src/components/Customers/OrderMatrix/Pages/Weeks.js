import React, { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Nav from '../Nav'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { NumToDayName, sortDatesIntoWeeks, ReturnDatefromArray } from '../../../../Utils/Function'
import { URL } from '../../../../Utils/URL'
import Discloure from './Discloure'
import Profile from './Profile'
import Invoices from './Invoices';
import { usePDF, Margin } from 'react-to-pdf';

export default function Weeks() {
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "multipage-example.pdf",
    page: { margin: Margin.SMALL }
  });
  const location = useLocation();
  const data = location.state;
  const [OrderList, setOrderList] = useState();
  useEffect(() => {
    async function run(){
      const orderlist = await axios.get(`${URL}/Users/User/OrderItem/${data.id}`);
      orderlist.data.push({LINEDESCRIPTION: 'Total'});
      setOrderList(orderlist.data);
    }
    run();
  }, []);
  let InvArr = [];
  for (let index = 0; index < location.state.data.length; index++) {
    const element = location.state.data[index];InvArr.push([element.INVOICENUMBER,element.INVOICEDATE.replace('/','-').replace('/','-')]) 
  }
  if (!OrderList) {
    return (<p>Loading</p>)
  }else {<br />
  return (
    <div className='bg-gray-800 h-screen' ref={targetRef} >
       {/* <button onClick={() => toPDF()} className='text-white border p-1 rounded-lg mt-2 hover:bg-white hover:text-black' >Print this page</button> */}
    <div className='flex flex-1'>
    <h1 className='text-md p-2 w-full text-white' >List</h1>
    <h1 className='text-md p-2 w-full text-white' >Week 1 <br />( {ReturnDatefromArray(sortDatesIntoWeeks(InvArr)[0])} )</h1>
    <h1 className='text-md p-2 w-full text-white' >Week 2 <br />( {ReturnDatefromArray(sortDatesIntoWeeks(InvArr)[1])} )</h1>
    <h1 className='text-md p-2 w-full text-white' >Week 3 <br />( {ReturnDatefromArray(sortDatesIntoWeeks(InvArr)[2])} )</h1>
    <h1 className='text-md p-2 w-full text-white' >Week 4 <br />( {ReturnDatefromArray(sortDatesIntoWeeks(InvArr)[3])} )</h1>
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
    <Profile />
    <Invoices data={InvArr} />
      </div>
  )
}
}