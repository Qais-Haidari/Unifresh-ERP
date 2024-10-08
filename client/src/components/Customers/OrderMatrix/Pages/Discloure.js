import React, { useEffect, useState } from 'react'
import axios from "axios";
import { URL } from '../../../../Utils/URL'

export default function Minidiscloure({data, orderlist}) {
  const [state, setstate] = useState([]);
  const [Total, setTotal] = useState(0);
  useEffect(() => {
    let orderDet = [];
    let orderTotal = [];
    for (let g = 0; g < orderlist.length; g++) {orderDet.push(orderlist[g].LINECODE)}
    let arr = [];
    let totalinv = []
    let totalres = [];
    for (let i = 0; i < data.length; i++) {const inv = data[i]; totalinv.push(inv);}
    async function run(){
      for (let a = 0; a < totalinv.length; a++) { const element = totalinv[a][0]; const res = await axios.get(`${URL}/OnlineOrdering/invoices/${element}`);totalres.push(res.data)}
      for (let v = 0; v < totalres.length; v++) {
        const element = totalres[v];
        for (let d = 0; d < element.length; d++) {
          const elementx = element[d];
              let a = []
              if(elementx.LINECODE !== ''){
                a[elementx.LINECODE] = elementx.INVOICEQTY
                orderTotal.push(a)
              }
            }
          }
          const combined = orderTotal.reduce((acc, obj) => {
            const key = Object.keys(obj)[0];
            acc[key] = (acc[key] || 0) + obj[key];
            return acc;
          }, {});
          let final = [];
          let count = 0;
          let total = 0;
          for (let q = 0; q < orderDet.length; q++) {
            for (let x = 0; x < Object.entries(combined).length; x++) {
              const element = orderDet[q];
              total = total + Object.entries(combined)[x][1];
              if(element === Object.entries(combined)[x][0]){
                final.push([element, Object.entries(combined)[x][1]])
              }
              if(element !== Object.entries(combined)[x][0]){
                final.push([element, 0])
              }
            }
          }
          const uniqueItems = {};
          final.forEach(([name, quantity]) => {
            // console.log(name, quantity)
              if (uniqueItems[name]) {
                  uniqueItems[name] += quantity;
              } else {
                  uniqueItems[name] = quantity;
              }
          });
          const result = Object.entries(uniqueItems);
          let totalNUm = 0;
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            totalNUm = totalNUm + element[1];
          }
          result[result.length -1] = ['Total',totalNUm]
          setstate(result)
        }
        run();
      }, []);
    if (!state) {
      return (<p>Loading</p>)
    }else {
  return (
    <React.Fragment>
      {state.map((res, index) => (
          <li className={`w-full px-4 py-2 border-b ${res[1] !== 0 ? "text-white" : 'text-red-700 via-red-900'} border-gray-200 rounded-t-lg dark:border-gray-600`}>{res[1] }</li>
      ))}
    </React.Fragment>
  )
}
}