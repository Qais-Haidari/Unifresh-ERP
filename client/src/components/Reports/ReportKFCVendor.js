import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import axios from "axios";
import { KFC_YUM } from '../../Utils/KFCVendors'

export default function MissedSaleOrder() {
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState([]);
  const [KFCYumStartDate, setKFCYumStartDate] = useState('');
  const [KFCYumEndDate, setKFCYumEndDate] = useState('');

    return (
      <Layout>
        <div className=" p-5 ">
          <div className="grid grid-cols-2 w-2/4 my-2 space-x-3">
            <h1 className=" leading-6 text-white ml-2" >Start Date</h1>
            <h1 className="text-white">End Date</h1>
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setKFCYumStartDate(e.target.value)} />
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setKFCYumEndDate(e.target.value)} />
          </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid grid-cols-1 gap-1 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <button className=" bg-green-500 p-4" onClick={() => KFC_YUM(KFCYumStartDate, KFCYumEndDate)} >
                <dt className="text-sm font-semibold leading-3 text-gray-300">YUM EDI</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">KFC</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">Collins EDI</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">KFC</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">Gfource EDI</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">KFC</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">Edelmanian</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">KFC</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">Festival State Foods: </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">KFC</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">EDI</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">Dominos</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300">EDI</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">Peregrine</dd>
              </button>
              <button className=" bg-green-500 p-8">
                <dt className="text-sm font-semibold leading-3 text-gray-300"></dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white"></dd>
              </button>
          </dl>
        </div>
    </div>
      </Layout>
    );
  }