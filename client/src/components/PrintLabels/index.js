import React, { useState, useEffect } from 'react'
import axios from "axios";
var Barcode = require('react-barcode');

export default function AccountingLinkMonitor() {
    const [state, setstate] = useState();
    useEffect(() => {
        axios
      .get(`http://localhost:5000/Ostendo/FLASH/ITEMS/LIST`)
      .then((res) => {
        setstate(res.data);
      }).catch((err) => (document.body.innerHTML = err));
    }, []);
    const keyUP = () => {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
      };
    if (!state) {
        return (
          <></>
        );
      } else {
  return (
    <div className='flex' >
        <div class="mt-2">
          <input
            type="text" placeholder="Search" onKeyUp={keyUP} id="myInput"
            className="bg-gray-50 border w-80 ml-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className='' >
          <ul id="myUL" className="max-w-md ml-4 overflow-y-auto scrollbar rounded-md w-full max-h-96 overflow-auto flex flex-col mt-2">
            {state.sort((a, b) => a.First_Name > b.First_Name ? 1 : -1).map((r) => (
                <li className="items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <a href='/#'>{r.ITEMCODE} - {r.ITEMDESCRIPTION}</a>
              </li>
            ))}
          </ul>
            </div>
        </div>
        <div className='flex justify-between mt-2 h-[566px] w-[377px] bg-white' id='divcontents'>
        <div className=' w-full rotate-90 ml-4 px-2 bg-white font-medium z-10' id='ifmcontentstoprint'>
            <p id='Desc' className='text-center text-xl font-bold'>Capsicums Green Standard Medium - 8Kg</p>
            <p id='Code' className='text-center text-xl' >Code: SUBCAPS7WA2</p>
            <div className='flex justify-between mt-10' >
            <p id='Packed On' className='font-bold text-xl'>Packed On: 31/05/24</p>
            <p id='UsedBy' className='font-bold text-xl'>Use By: 31/05/24</p>
            </div>
        </div>
            <p className=''><Barcode value="401017253105" /></p>
        <div>
        </div>
        </div>
    </div>
  )
}
}
