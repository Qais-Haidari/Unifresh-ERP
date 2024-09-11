import React from 'react'
import { Link } from "react-router-dom";

export default function Nav({ data }) {
  return (
    <div className='bg-gray-800 text-center' >
        <div className=" space-x-2 flex align-middle justify-center pt-2" >
            <h1 className='text-white text-lg text-center' >{data.id}</h1>
            <h1 className='text-white text-lg text-center' >(Start Date: {data.StartDate}</h1>
            <h1 className='text-white text-lg text-center' >End Date:{ data.EndDate} )</h1>
        </div>
    </div>
  )
}
