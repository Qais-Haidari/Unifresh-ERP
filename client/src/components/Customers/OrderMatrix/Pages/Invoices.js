import React, { useEffect, useState } from 'react'
import axios from "axios";
import { URL } from '../../../../Utils/URL'

export default function Invoices({ data }) {
    const [state, setstate] = useState();
    useEffect(() => {
        let totalinv = []
        let totalres = [];
        let allInvoices = [];
        for (let i = 0; i < data.length; i++) {const inv = data[i]; totalinv.push(inv);}
        async function Load(){
            for (let a = 0; a < totalinv.length; a++) {
                const element = totalinv[a][0];
                const res = await axios.get(`${URL}/OnlineOrdering/invoices/${element}`);
                totalres.push(res.data)
              }
                for (let v = 0; v < totalres.length; v++) {const element = totalres[v];
                for (let d = 0; d < element.length; d++) {const elementx = element[d];allInvoices.push(elementx)}}
                let totalOder = 0;
                let totalPrice = 0;
                for (let index = 0; index < allInvoices.length; index++) {
                  const element = allInvoices[index];
                  totalOder = totalOder + element.INVOICEQTY;
                  totalPrice = totalPrice + element.INVOICEUNITPRICE;
                }
                allInvoices.push({
                    LINEDESCRIPTION: 'Total', 
                    INVOICEQTY: totalOder, 
                    INVOICEDATE: '',
                    INVOICEUNITPRICE: totalPrice
                  });
                setstate(allInvoices)
              }
        Load()
    }, []);
    if(!state){
        return ( <p>Loading</p> )
    }else {
  return (
    <div className='bg-gray-800' >
      <div className="mt-2 flow-root mx-2">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y border divide-gray-300">
                  <thead className="bg-gray-800">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Product</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Quantity</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">INVOICEDATE</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">UNITPRICE</th>
                    </tr> 
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-800">
                    {state.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.LINEDESCRIPTION}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.INVOICEQTY}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">{person.INVOICEDATE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-white">${Math.floor(person.INVOICEUNITPRICE)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}
}