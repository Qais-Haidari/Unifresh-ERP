import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function OnlineOrder() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
          .get(`http://10.0.0.140:5000/onlineOrdering/ordering/Schedules/Test 8`)
          .then((res) => {
            setstate(res.data)
          })
          .catch((err) => (document.body.innerHTML = err));
  }, []);
  if (state[0] === undefined) {
    return (<p>Loading</p>)
  } else {
    return (
      <div>
        <div className='m-auto'>
          <h1 className=' text-center text-white text-xl leading-normal' >{state[0].CUSTOMER}</h1>
          <h1 className=' text-center text-white text-xl leading-normal' >Ordering Schedule{}</h1>
        </div>
        <table className=" w-auto m-auto leading-normal" id="myTable">
              <thead>
                <tr>
                  <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-md font-bold text-xl text-white capitalize tracking-wider'>Order Cut-Off</th>
                  <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-md font-bold text-xl text-white capitalize tracking-wider'>Dispatch</th>
                  <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-md font-bold text-xl text-white capitalize tracking-wider'>Delivery</th>
                  <th className='px-5 py-3 border-b-2 border-gray-200  text-left text-md font-bold text-xl text-white capitalize tracking-wider'>Tick</th>
                </tr>
              </thead>
              <tbody>
                {state.map((r) => (
                  <tr>
                    <td className='px-5 py-2 border-b border-gray-200 text-white font-semibold text-lg' >{r.CUTOFFDAYNAME} {r.CUTOFFDAY} at {r.CUTOFFTIME}</td>
                    <td className='px-5 py-2 border-b border-gray-200 text-white font-semibold text-lg' >{r.DISPATCHDAYNAME} {r.DISPATCHDAY}</td>
                    <td className='px-5 py-2 border-b border-gray-200 text-white font-semibold text-lg' >{r.DISPATCHDAYNAME} {r.DELIVERYDAY}</td>
                    <td className='px-5 py-2 border-b border-gray-200 text-white font-semibold text-2xl' >☐</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-auto">
              Print
            </button>
      </div>
    )
  }
}
