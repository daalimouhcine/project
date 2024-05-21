import React from "react";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import SearchComponent from "@/components/search/search.component";

const RhSide = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <div>
      <div className='fixed ml-14 md:ml-64 w-11/12 flex justify-end items-center h-14 bg-gray-100 z-10'>
        <SearchComponent />
      </div>

      {/*sidebar*/}
      <div className='flex '>
        <div className='fixed flex flex-col left-0 w-14 hover:w-64 rh_side md:w-64 bg-[#0793DB] dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10'>
          <div className='flex flex-col items-center pt-3 w-full'>
            <img
              className='w-20 rounded-full hidden md:block  img_rh '
              alt='_'
              src='https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg'
            />
            <span className='mt-3 tracking-wide truncate hidden md:block name_rh'>
              Sentinelles
            </span>
          </div>
          <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow'>
            <ul className='flex flex-col py-4 gap-3'>
              <li>
                <a
                  href='/rh'
                  className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-black border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
                  <i className='fas fa-home inline-flex justify-center items-center ml-4'></i>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href='/rh/collaborateursList'
                  className=" bg:['active'] relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-black border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
                  <i className='fas fa-users inline-flex justify-center items-center ml-4'></i>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    Collaborateurs
                  </span>
                </a>
              </li>
              <li>
                <a
                  href='/rh/listManagers'
                  className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-black border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
                  <i className='fas fa-user inline-flex justify-center items-center ml-4'></i>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    Managers
                  </span>
                </a>
              </li>

              <li>
                <a
                  href='/rh/profile'
                  className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-black border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
                  <i className='fas fa-user-circle inline-flex justify-center items-center ml-4'></i>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    Profile
                  </span>
                </a>
              </li>

              <li onClick={handleLogout}>
                <a
                  href='#'
                  className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-black border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
                  <i className='fas fa-sign-out-alt inline-flex justify-center items-center ml-4'></i>
                  <span className='ml-2 text-sm tracking-wide truncate'>
                    Deconnection
                  </span>
                </a>
              </li>
            </ul>
            <div className='flex justify-center mb-14 py-3'>
              <img
                className='img_rh hidden md:block'
                src={require("@/common/images/CgateLogoLight.png")}
                alt='_'
              />
            </div>
          </div>
        </div>
        <main className='ml-14 md:ml-64 mt-9 w-10/12  md:w-8/12 lg:w-9/12 xl:w-10/12'>
          <div className='py-4'>
            <div className='mx-auto px-4 sm:px-6 md:px-8'>
              {/* Replace with your content */}
              <div className='py-4'>
                <Outlet />
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RhSide;
