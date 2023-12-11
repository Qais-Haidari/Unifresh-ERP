import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Example() {
  const [state, setstate] = useState([]);
  let a = useLocation();
  useEffect(() => {
    setstate(a.pathname);
  }, []);
  return (
    <div className="">
      <nav class="flex items-center justify-between flex-wrap p-6 bg-[#1b365d]">
        <div class="w-full block lg:flex-grow sm:flex sm:justify-between  lg:flex lg:items-center lg:w-auto">
          <div class="text-md lg:flex-grow">
            <div className="lg:block">
              <Link
                to="/tasklist"
                className={
                  state === "/tasklist"
                    ? "block mt-4 lg:inline-block sm:inline lg:mt-0 text-red-600  mr-4 sm:text-lg"
                    : "block mt-4 lg:inline-block sm:inline lg:mt-0 text-white  mr-4 sm:text-lg"
                }
              >
                My Task
              </Link>
              <Link to="/dashboard">
                <p
                  className={
                    state === "/dashboard"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Dashboard
                </p>
              </Link>
              <Link to="/PrimaryTask">
                <p
                  className={
                    state === "/PrimaryTask"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Primary Tasks
                </p>
              </Link>
              <Link to="/AdvanceDashboard">
                <p
                  className={
                    state === "/AdvanceDashboard"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Advance Dashboard
                </p>
              </Link>
              <Link to="/admin">
                <p
                  className={
                    state === "/admin" ||
                    state === "/createUser" ||
                    state === "/createDepartment" ||
                    state === "/createTask"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Admin
                </p>
              </Link>
              <Link to="/Customize">
                <p
                  className={
                    state === "/Customize" ||
                    state === "/Customize/BulkUpdate" ||
                    state === "/Customize/OldTask" ||
                    state === "/tasktimemanagment"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Customize
                </p>
              </Link>
              <Link to="/Report">
                <p
                  className={
                    state === "/Report"
                      ? "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-red-600  mr-4 sm:text-lg"
                      : "block mt-4 lg:inline-block sm:hidden lg:mt-0 text-white  mr-4 sm:text-lg"
                  }
                >
                  Report
                </p>
              </Link>
            </div>
          </div>
          <div className="sm:-mt-6">
            <img
              alt="LOGO"
              src={require("./logo (1).jpg")}
              className="lg:w-32 sm:w-32 mr-2 sm:mt-4 lg:mt-0 rounded-md"
            />
          </div>
          <div className="sm:-mt-6">
            <Link to="/profile">
              <p class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Profile
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
