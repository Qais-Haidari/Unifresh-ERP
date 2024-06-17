import React, { useState, useEffect } from 'react'
import Layout from "../../Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Customers() {
const [state, setstate] = useState();
const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `http://10.0.0.52:5000/Customers`
      )
      .then((res) => {
        setstate(res.data);
        setLoading(false)
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);


  const myFunction = () => {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
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
  }

  if (!state) {
    return (<p>Loading</p>)
  }else {
    return (
      <Layout>
      <div>
      <div className="">
        <div className="flow-root mx-2">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <input placeholder='Search Customer ...' id='myInput' onKeyUp={myFunction} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 my-1 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                <table className="min-w-full divide-y divide-gray-300" id='myTable' >
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SHIPPINGMETHOD</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {state.map((r) => (
                      <tr>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.CUSTOMER}</td>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.SHIPPINGMETHOD}</td>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">{r.PRIMARYCONTACT}</td>
                      <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-500">
                      <div class="inline-flex rounded-md shadow-sm" role="group">
                        <button type="button" class="px-4 bg-green-600 text-white py-2 text-sm font-medium border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        More
                        </button>
                        <button type="button" class="px-4 py-2 text-sm font-medium  bg-blue-700 text-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Shadow
                        </button>
                        <button type="button" class="px-4 py-2 text-sm font-medium bg-red-600 border-t text-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Orders
                        </button>
                        <button type="button" class="px-4 py-2 text-sm font-medium bg-purple-700 text-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <Link to={`/Customers/Schedules/${r.CUSTOMER}`}>Schedules</Link>
                        </button>
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
    )
  }
}
