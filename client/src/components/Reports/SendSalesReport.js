import bcrypt from "bcryptjs";
import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import EmailTempalte from "../../components/Template/Email/Email";
import { getDaysFromNow, AussieDate, hashArrayWithSecret, getLastMonthStartAndEnd } from "../../Utils/Function";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function SendSalesReport() {
  const [state, setstate] = useState();
  const [Loading, setLoading] = useState(false);

  const [startDate, setstartDate] = useState('');
  const [EndDate, setEndDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/Customers`)
      .then((res) => { setstate(res.data); setLoading(false); })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  const myFunction = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  async function HandleSendLink(Customer){
    const { startOfLastMonth, endOfLastMonth } = getLastMonthStartAndEnd()
    const BeforeHash = `${Customer}/${getDaysFromNow(startOfLastMonth)}/${getDaysFromNow(endOfLastMonth)}/${startOfLastMonth}/${endOfLastMonth}`;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(`${BeforeHash}`, salt);

    axios.post('http://localhost:5000/API/v/1/SendSalesReport', { 
      ID : Math.floor(Math.random() * 10000000000000000000000000000000000000000),
      Customer : Customer,
      Hash : hash,
      BeforeHash : BeforeHash
     }).then((res) => {
      window.location.reload();
    })
    .catch((err) => {});
  }

  if (!state) {
    return <p>Loading</p>;
  } else {
    return (
      <Layout>
        <div>
          <div className="">
            <div className="grid grid-flow-col ml-2 w-full grid-col-3">
              <div className="flex" >
              <input
                placeholder="Search Customer ..."
                id="myInput"
                onKeyUp={myFunction}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 my-1 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 text-sm rounded ml-2" >Bulk Send</button>
              </div>
            </div>
            <div className="flow-root mx-2">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table
                      className="min-w-full divide-y divide-gray-300"
                      id="myTable"
                    >
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">✔️</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer Name</th>
                          <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          <div className="inline-flex space-x-10 items-center justify-center rounded-md shadow-sm">
                            <p>Send Link</p>
                            </div></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {state.map((r) => (
                          <tr>
                            <td className="whitespace-nowrap px-2 py-3 text-md text-black"><input type="checkbox" className="mt-2 " /></td>
                            <td className="whitespace-nowrap px-2 py-3 text-md text-black">{r.CUSTOMER}</td>
                            <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">
                              <div className="inline-flex rounded-md shadow-sm">
                                <button className="px-5 py-1 text-sm font-medium rounded-md bg-red-600 border-t text-white border border-gray-200" onClick={() => HandleSendLink(r.CUSTOMER)} >Send</button>
                              </div>
                            </td>
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
      </Layout>
    );
  }
}
