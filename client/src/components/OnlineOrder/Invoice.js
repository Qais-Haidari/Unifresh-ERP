import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Invoice() {
  const {invoice} = useParams();
  const [invoices, setinvoices] = useState([])
	useEffect(() => {
    document.title = 'Unifresh Invoice'
    axios
          .get(`http://10.0.0.129:5000/onlineOrdering/invoices/${invoice}`)
          .then((res) => {
            setinvoices(res.data)
            // console.log(res.data)
            
          }
          ).catch((err) => (document.body.innerHTML = err));
    // axios
    //       .get(`http://10.0.0.129:5000/Users/User/Test 8`)
    //       .then((res) => {
    //         console.log(res.data)
    //       }
    //       ).catch((err) => (document.body.innerHTML = err));
        }, []);

        if (invoices) {
          const output = invoices.reduce((prev, { INVOICENUMBER, INVOICEQTY }) => {
            prev[INVOICENUMBER] = prev[INVOICENUMBER] ? prev[INVOICENUMBER] + INVOICEQTY : INVOICEQTY;
            return prev;
          }, {});
          console.log(output);
        }

        if(!invoices[0]){
          return (<p>true</p>)
        }else {
          return (
            <div>
              <div className="text-center mt-2 text-black bg-white rounded-md">
                <div className="flex justify-between" >
                  <div className="text-left ml-2" >
                    <p className=" text-4xl font-bold" >UniFresh</p>
                    <p className=" font-medium">A Cut Above The Rest</p>
                    <p className="font-bold" >Tax Invoice</p>
                    <p className="mt-4 font-medium" >Customer Copy</p>
                  </div>
                  <div className="text-right mr-2 text-lg font-semibold" >
                    <p>Date: {invoices[0].INVOICEDATE}</p>
                    <p>Invoice #: {invoices[0].INVOICENUMBER}</p>
                  </div>
                  {/* <img
                    alt="LOGO"
                    className="m-auto rounded-md mt-2"
                    src={require("../../Image/documentHeader.png")}
                  /> */}
                </div>
            <div className="grid mt-2 text-left ml-32 grid-cols-4 gap-4">
              {/* <div><p>Ship To: {invoices[0]}</p></div> */}
              <div><p className="font-medium" >Invoice Date: {invoices[0].INVOICEDATE}</p></div>
              <div><p className="font-medium" >Ph: {invoices[0].ORDERPHONE}</p></div>
              <div><p className="font-medium" >Document Number: {invoices[0].INVOICENUMBER}</p></div>
              <div><p className="font-medium" >Customer FAX: {invoices[0].CUSTOMERFAX}</p></div>
              <div><p className="font-medium" >PO Num: {invoices[0].PURCHASEREFERENCE}</p></div>
              <div><p className="font-medium" >Ship Via: {invoices[0].SHIPPINGMETHOD + invoices[0].ADDITIONALFIELD_7}</p></div>
              <div><p className="font-medium" >Payment Terms: {invoices[0].CREDITTERM}</p></div>
            </div>
                <div className="relative overflow-x-auto mx-2 rounded-md">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-[#74aa50]">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          QTY. Unit
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tax
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            invoices.map((r) => (
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoices[0].INVOICEQTY}</th>
                              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoices[0].LINEDESCRIPTION}</th>
                              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoices[0].INVOICEUNITPRICE}</th>
                              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoices[0].INVOICETOTALAMOUNT}</th>
                              <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invoices[0].INVOICEUNITTAX}</th>
                              </tr>
                            ))
                        }
                    </tbody>
                  </table>
                </div>
            {/* <div className="grid mt-2 text-left ml-32 grid-cols-4 gap-4">
                  <p>Comment: {invoices[0].CUSTOMERNOTES}</p>
                  <p>SalesAmount: {invoices[0].INVOICENETTAMOUNT}</p>
                  <p>Delivery: {invoices[0].INVOICETAXAMOUNT}</p>
                  <p>GST: {invoices[0].INVOICETAXAMOUNT}</p>
                  <p>TOTAL: {invoices[0].INVOICETOTALAMOUNT}</p>
            </div> */}
                <div className="flex justify-between" >
                  <div>
                    <p className=" font-medium ml-3 text-left">BANK: NAB</p>
                    <p className=" font-medium ml-3 text-left">Account: 476678896</p>
                    <p className=" font-medium ml-3 text-left">BSB: 085-741</p>
                    <p className=" font-medium ml-3 text-left">ABN: 30 008 297 103</p>
                    <p className=" font-medium ml-3 text-left">64 Ninth Ave</p>
                    <p className=" font-medium ml-3 text-left">Woodville North SA 5012</p>
                    <p className=" font-medium ml-3 text-left">PO Box 133</p>
                    <p className=" font-medium ml-3 text-left">Kilkenny SA 5009</p>
                    <p className=" font-medium ml-3 text-left">P: 8445 6444</p>
                    <p className=" font-medium ml-3 text-left">F: 8445 6444</p>
                    <p className=" font-medium ml-3 text-left">www.unifresh.com.au</p>
                  </div>
                  <div>
                    <p className="font-medium ml-3 text-left">{invoices[0].ORDERNOTES}</p>
                    <p className="font-medium ml-3 text-left">{invoices[0].CUSTOMERNOTES}</p>
                    <p className="font-medium ml-3 text-left">{invoices[0].INVOICENOTES}</p>
                    <p className="font-medium ml-3 text-left mt-10">Total Kg:</p>
                    <p className="font-medium ml-3 text-left">BOX COUNT:</p>
                  </div>
                  <div>
                    <p className="font-medium mr-3 text-left">Total Amount</p>
                  </div>
                </div>
                <div className=" font-medium mt-2">
                  At UniFresh we guarantee 100% usable product or your Money Back!
                </div>
              </div>
            <button onClick={window.print} className="text-white ml-32 mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Print</button>
            </div>
          )
        }
}
