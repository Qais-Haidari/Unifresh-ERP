import React from "react";
import App from "./App_1";

export default function Mainpage() {
  return (
    <div>
      <App />
      <div class="w-full max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2">
        <div class="flex flex-col items-center pb-10">
          <h5 class="mb-1 text-xl font-medium text-white dark:text-white">
            First Name:
            <span className=" text-black">
              {localStorage.getItem("First_Name")}
            </span>
          </h5>
          <span class="lg:text-sm md:text-md text-white dark:text-gray-400">
            Last Name:{" "}
            <span className=" text-black">
              {localStorage.getItem("Last_Name")}
            </span>
          </span>
          <span class="lg:text-sm md:text-md text-white dark:text-gray-400">
            Email:{" "}
            <span className=" text-black">{localStorage.getItem("Email")}</span>
          </span>
          <span class="lg:text-sm md:text-md text-white dark:text-gray-400">
            Start of Business:{" "}
            <span className=" text-black">
              {localStorage.getItem("Start_of_business")}
            </span>
          </span>
          <span class="lg:text-sm md:text-md text-white dark:text-gray-400">
            End of Business:{" "}
            <span className=" text-black">
              {localStorage.getItem("End_of_business")}
            </span>
          </span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <p class="inline-flex items-center mt-2 px-4 py-2 lg:text-sm md:text-md font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              Unifresh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
