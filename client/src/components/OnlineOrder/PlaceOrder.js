import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

import Navigation from './Navigation';
const moment = require('moment');

export default function OnlineOrder() {
  let [isOpen, setIsOpen] = useState(false)
  let [isOpen1, setIsOpen1] = useState(false)
  const [state, setstate] = useState([]);
  const [OrderItems, setOrderItems] = useState([]);
  const [OrderDate, setOrderDate] = useState([]);

  const [SelectDate, setSelectDate] = useState('');
  const [Purchaseordernumber, setPurchaseordernumber] = useState('');
  const [SelectItems, setSelectItems] = useState([]);
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
  
    const cancelButtonRef = useRef(null)
    const cancelButtonRef1 = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }
  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const [Mon, setMon] = useState([]);
  const [Tue, setTue] = useState([]); 
  const [Wed, setWed] = useState([]); 
  const [Thu, setThu] = useState([]); 
  const [Fri, setFri] = useState([]); 
  const [Sat, setSat] = useState([]); 
  const [Sun, setSun] = useState([]);
  

  useEffect(() => {
    axios
      .get(`http://10.0.0.129:5000/Users/User/OrderItem/${localStorage.getItem('!@#!@#asdacas!@#')}`, { timeout: 50000 })
      .then((res) => {
        setOrderItems(res.data)
      }
      ).catch((err) => (document.body.innerHTML = err));

      axios
      .get(`http://10.0.0.129:5000/Users/User/OrderDateCheck/Hungry Jacks Aberfoyle Park`)
      .then((res) => {

        // setOrderItems(res.data)
        
      }
      ).catch((err) => (document.body.innerHTML = err));
      
      axios
          .get(`http://10.0.0.129:5000/Users/User/OrderScheduleCheck/${localStorage.getItem('!@#!@#asdacas!@#')}`)
          .then((res) => {
            let Monday = [];
            let Tuesday = []; 
            let Wednesday = []; 
            let Thursday = []; 
            let Friday = []; 
            let Saturday = []; 
            let Sunday = [];
            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                if (element.DELIVERYDAYNAME === 'Monday') {
                    Monday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE  })
                }
                if (element.DELIVERYDAYNAME === 'Tuesday') {
                    Tuesday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
                if (element.DELIVERYDAYNAME === 'Wednesday') {
                    Wednesday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
                if (element.DELIVERYDAYNAME === 'Thursday') {
                    Thursday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
                if (element.DELIVERYDAYNAME === 'Friday') {
                    Friday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
                if (element.DELIVERYDAYNAME === 'Saturday') {
                    Saturday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
                if (element.DELIVERYDAYNAME === 'Sunday') {
                    Sunday.push({ date: `${element.DELIVERYDAY}`, event: '', CUTOFFDAY: element.CUTOFFDAY , CUTOFFDAYNAME: element.CUTOFFDAYNAME , CUTOFFTIME: element.CUTOFFTIME , DELIVERYDAY: element.DELIVERYDAY , DELIVERYDAYNAME: element.DELIVERYDAYNAME , DISPATCHDAY: element.DISPATCHDAY , DISPATCHDAYNAME: element.DISPATCHDAYNAME , INVOICE: element.INVOICE })
                }
            }
            setMon(Monday)
            setTue(Tuesday)
            setWed(Wednesday)
            setThu(Thursday)
            setFri(Friday)
            setSat(Saturday)
            setSun(Sunday)
          }
          ).catch((err) => (document.body.innerHTML = err));
      
  }, []);
  const addremove = (indexs) => {
    document.getElementById(`${indexs}`).classList.add('bg-blue-600');
    document.getElementById(`${indexs}`).classList.remove('bg-white');
    for (let index = 0; index < document.getElementsByClassName('bg-blue-600').length; index++) {
      if (Number(document.getElementsByClassName('bg-blue-600')[index].id) !== indexs) {
        document.getElementsByClassName('bg-blue-600')[index].classList.add('bg-white');
        document.getElementsByClassName('bg-blue-600')[index].classList.remove('bg-blue-600');
      }
    }
  }
 
  const submit = () => {
      axios
          .post("http://10.0.0.129:5000/onlineOrdering/web/CreateOrder", {
            PONumber: Purchaseordernumber,
            OrderItems: SelectItems,
            OrderDate: SelectDate,
            customer: `${localStorage.getItem('!@#!@#asdacas!@#')}`
          })
          .then((res) => {
            alert("Your Order Placed.");
            // window.location.reload();
          })
          .catch((err) => {});
  }

  const ShowSummary = () => {
    if (SelectDate) {
      setOpen1(true)
      let masterarr = [];
      for (let index = 0; index < document.getElementById('OrderItemParent').children.length; index++) {
        // console.log(document.getElementById('OrderItemParent').children[index].children[1].innerText)
        let arr = { Itemcode: document.getElementById('OrderItemParent').children[index].children[0].innerText, Unit:  document.getElementById('OrderItemParent').children[index].children[3].children[0].children[1].innerText, Price: '', Description: document.getElementById('OrderItemParent').children[index].children[1].innerText};
        masterarr.push(arr)
      }
      setSelectItems(masterarr)
    }else {
      setOpen(true)
    }
  }
    return (
      <div>
        <div className="container mx-auto mt-2">
          <Navigation />
          
          <div className="relative mt-20 overflow-x-auto">
            <input type="text" id="simple-search" onChange={(e) => { setPurchaseordernumber(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/4 pl-10 p-2.5 mb-2" placeholder="Purchase Order Number ( Optional )" />
            <p>Please select Dispatch Day</p>
            
            <div className="lg:flex lg:h-full w-full mx-auto rounded-md lg:flex-col mt-2">
            <div className="grid grid-cols-7 mx-auto border w-full text-center bg-green-700 text-white p-3 rounded-md sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-7" >
        <div>
            <p>Monday</p>
            {Mon.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)} >
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}
        </div>
        <div><p>Tuesday</p>
        {Tue.map((item) => (
            <div class="group relative">
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)}>
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            {/* <span class="group-hover:opacity-100 transition-opacity w-11/12 bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-5 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">You are ordering for dispatch day {item.DELIVERYDAYNAME} {item.DELIVERYDAY}, please place this order by 4pm Friday’</span> */}
        </div>
            ))}
           </div>
        <div><p>Wednesday</p> 
        {Wed.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)} >
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}
        </div>
        <div><p>Thursday</p> {Thu.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)}>
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}</div>
        <div><p>Friday</p> {Fri.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)}>
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}</div>
        <div><p>Saturday</p> {Sat.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)}>
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}</div>
        <div><p>Sunday</p> {Sun.map((item) => (
            <li className="flex rounded-md shadow-sm mx-2 mt-1" onClick={(e) => setSelectDate(item.date)}>
             <div className={ item.date === SelectDate ? " bg-blue-600 text-white flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200" : "flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 text-black bg-white"}>
               <div className="flex-1 truncate px-4 py-2 text-sm">
                 <p className="">{item.date}</p>
               </div>
             </div>
           </li>
            ))}</div>
          </div>
        </div>
            {/* <div>
                <dl className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-6">
                  {OrderDate.map((item, index) => (
                    <div key={item.name} id={index}  className="overflow-hidden rounded-lg bg-white shadow p-4">
                      <p onClick={(e) => { setSelectDate(e.target.innerText); addremove(index) }} >{item.DISPATCHDAY}</p>
                    </div>
                  ))}
                </dl>
                </div> */}
            <table className="w-full text-sm text-left text-gray-500 mt-2 rounded-md dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="px-6 py-3">
                    Image
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Product Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody id='OrderItemParent'>
                {
                  OrderItems.map((r, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {r.LINECODE}
                      </th>
                      <td className="px-6 py-4">
                        {r.LINEDESCRIPTION.replace(/\%20/g, ' ')}
                      </td>
                      <td className="px-6 py-4">
                        {r.SELLPRICE !== 0.1 ? '' : r.SELLPRICE}
                      </td>
                      <td className="px-6 py-4">
                        <div className='flex space-x-2' >
                          <button className='btn bg-green-600 px-2 rounded-lg text-white text-base' onClick={() => document.getElementById(`itemCount${index}`).innerText = Number(document.getElementById(`itemCount${index}`).innerText) - 1} >-</button>
                          <p id={`itemCount${index}`} >0</p>
                          <button className='btn bg-red-600 px-2 rounded-lg text-white text-base' onClick={() => document.getElementById(`itemCount${index}`).innerText = Number(document.getElementById(`itemCount${index}`).innerText) + 1}  >+</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() => ShowSummary()}
            // onClick={submit}
            className="rounded-md bg-black/20 px-4 py-2 text-sm mt-2 font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            Process Order
          </button>
        </div>

        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Online Order Failed
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        1: Pleaes Select Order Date
                        2: Please Add Items to the list.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
        </Transition.Root>
        <Transition.Root show={open1} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef1} onClose={setOpen1}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex min-h-full min-w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Order Summary
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Order Date: {SelectDate}</p>
                      <p className="text-sm text-gray-500">PO Number: {Purchaseordernumber}</p>
                    </div>
                    <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Item Code
                                </th>
                                {/* <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Description
                                </th> */}
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Unit
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Unit Price
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {SelectItems.map((r, index) => (
                                <tr key={r.email}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {r.Itemcode}
                                  </td>
                                  {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {r.Description}
                                  </td> */}
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{r.Unit}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ !r.Prince ? '$0.00' : r.Price }</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{ !r.Prince ? '$0.00' : r.Price }</td>
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
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpen1(false)}
                    ref={cancelButtonRef1}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {submit()}}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
        </Transition.Root>
      </div>
    )
}