import React, { useEffect, useState } from 'react'
import axios from 'axios';

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]
  export default function Example() {
      const [state, setstate] = useState([]);
    useEffect(() => {
      document.title = 'Unifresh Invoice'
        //   axios
        //         .post(`http://sw.unifresh.com.au:3777/documentconnector.php?qt=INVOICES&limit=${Limit}&uName=${localStorage.getItem('WEB_CUSTOMER').replace(/\%/g, "")
        //     .replace(/20/g, " ")}`)
        //     .then((res) => {
        //           const a = JSON.parse(convert.xml2json(res.data, { compact: true }));
        //       let arr = [];
        //       let credit;
        //       for (let index = 0; index < a.xml.INVOICE.length; index++) {
        //             if (a.xml.INVOICE[index].INVOICESTATUS._text.replace(/\%20/g,' ') === 'Fully Paid') {
        //               if (a.xml.INVOICE[index].INVOICEORCREDIT._text === 'Credit') {
        //                 credit = 'Delivered/Paid'
        //       } else {
        //                 credit = 'Delivered/Paid'
        //       }
        //     } else if (a.xml.INVOICE[index].INVOICESTATUS._text === 'Planned') {
        //               credit = 'Order Placed'
        //     } else if (a.xml.INVOICE[index].INVOICESTATUS._text === 'Printed') {
        //               if (Date.parse(a.xml.INVOICE[index].INVOICEDATE._text) / 1000 <= Date.parse(Date('d-m-y'))) {
        //                 credit = 'Delivered/Unpaid';
        //       } else {
        //                 credit = 'Pending';
        //       }
        //     }else {
        //               credit = 'Order Placed'
        //     }
        //         arr[index] = {
        //               AMOUNTPAID: a.xml.INVOICE[index].AMOUNTPAID._text,
        //           BALANCEDUE: a.xml.INVOICE[index].BALANCEDUE._text,
        //           INVOICEDATE: a.xml.INVOICE[index].INVOICEDATE._text,
        //           INVOICEDUEDATE: a.xml.INVOICE[index].INVOICEDUEDATE._text,
        //           INVOICENUMBER: a.xml.INVOICE[index].INVOICENUMBER._text,
        //           INVOICEORCREDIT: a.xml.INVOICE[index].INVOICEORCREDIT._text,
        //           INVOICESTATUS: credit,
        //           INVOICETOTALAMOUNT: a.xml.INVOICE[index].INVOICETOTALAMOUNT._text,
        //     };
        //   }
        //       setstate(arr)
        //       setloading(true)
        // })
        //     .catch((err) => (document.body.innerHTML = err));
        axios
                .get(`http://10.0.0.52:5000/onlineOrdering/ViewDocuments/10/Dominos Glenelg`)
            .then((res) => {
                setstate(res.data)
        })
            .catch((err) => (document.body.innerHTML = err));
}, []);
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <a href='/#/orderOnline' className='bg-blue-500 mr-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Back</a>
            <select className="inline-flex mb-2 border-red-100 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >
                <option className="bg-gray-100 text-gray-900" >10</option>
                <option className="bg-gray-100 text-gray-900" >20</option>
                <option className="bg-gray-100 text-gray-900" >50</option>
            </select>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Document Number</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Document Date</th> 
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Status</th> 
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Total Amount</th> 
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Amount Paid</th> 
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Due Date</th> 
                    {/* <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Invoice Credit</th>  */}
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">BALANCE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><a target='_blank' href={`#/orderOnline/Invoice/` + person.INVOICENUMBER} >{person.INVOICENUMBER}</a></td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEDATE}</td>
                        {
                          person.INVOICESTATUS === 'Fully Paid' ? 
                          (
                              <>
                              {
                                person.INVOICEORCREDIT === 'Credit' ? (
                                <>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Delivered/Paid</td>
                                </>
                                ) : 
                                (
                                  <>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Delivered/Paid</td>
                                  </>
                                )
                              }
                              </>
                           ) : 
                           (
                            <>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Order Placed</td>
                            </>
                           )
                        }
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.AMOUNTPAID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.BALANCEDUE}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEDUEDATE}</td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICEORCREDIT}</td> */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.INVOICETOTALAMOUNT}</td>
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