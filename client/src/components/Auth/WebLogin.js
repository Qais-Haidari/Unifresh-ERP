import Axios from "axios";
import React, { useState } from "react";
// const convert = require("xml-js");

export default function Auth() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const GetDetail = (e) => {
    Axios.get(`http://10.0.0.223:5000/Auth/WebLogin/Login/${Username}/${Password}`)
      .then((res) => {
        if (res.data[0].CUSTOMER === '') {
          alert('Username or Passowrd is incorrect');
        }else {
          localStorage.setItem('!@#!@#asdacas!@#', res.data[0].CUSTOMER);
          localStorage.setItem('!@#S@SDA!@#', Username);
          localStorage.setItem('$@#G%%#$F@#$', Password);
          localStorage.setItem('WebLogin', 1)
          window.location.reload()
        }
      }).catch((err) => (document.body.innerHTML = err));
  };

  return (
    <div className="">
      <section class="bg-green dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <img
            class=" w-52 rounded-xl mb-2"
            src={require("./logo (1).jpg")}
            alt="logo"
          /> */}
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login in to your account
              </h1>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setUsername(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={GetDetail}
                class="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
