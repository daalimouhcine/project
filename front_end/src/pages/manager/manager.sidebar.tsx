import { NavLink, Outlet } from "react-router-dom";
import React, { Fragment, useState } from "react";
// import OrganisateurPart from "./organisateur.part";
import { Dialog, Transition } from "@headlessui/react";
import {
  // CalendarIcon,
  // ChartBarIcon,
  // FolderIcon,
  // InboxIcon,
  UserIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
  CalendarIcon,
} from "@heroicons/react/outline";

import { CGateLogo } from "@/common/images/cgateLogoNormal";
import SearchComponent from "@/components/search/search.component";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "", icon: HomeIcon, current: false },
  { name: "Calendar", to: "gestionPlace", icon: CalendarIcon, current: false },
  { name: "Profile", to: "profile", icon: UserIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ManagerSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useLocalStorage<any>("data");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <>
      <div className='fixed ml-14 hidden md:flex md:ml-64 w-11/12 justify-end items-center h-14 bg-gray-100 z-10'>
        <SearchComponent />
      </div>

      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 md:hidden'
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 flex z-40'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'>
                <Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                    <div className='flex-shrink-0 flex items-center px-4'>
                      <CGateLogo className='h-20 w-auto' />
                    </div>
                    <nav className='mt-5 px-2 space-y-1'>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}>
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                  <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
                    <div className='flex justify-between flex-shrink-0 w-full group'>
                      <div className='flex items-center'>
                        <div>
                          {user.user.image === "default.png" ? (
                            <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black object-cover border-white border-4'>
                              <span className='text-sm font-medium leading-none text-white'>
                                {user.user.nom[0].toUpperCase() +
                                  user.user.prenom[0].toUpperCase()}
                              </span>
                            </span>
                          ) : (
                            <img
                              className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                              src={user.user.image}
                              alt=''
                            />
                          )}
                        </div>
                        <div className='ml-3'>
                          <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
                            {user.user.nom + " " + user.user.prenom}
                          </p>
                        </div>
                      </div>
                      <div className='w-fit p-3 text-gray-400 group-hover:text-gray-500 cursor-pointer'>
                        <LogoutIcon
                          onClick={handleLogout}
                          className='flex-shrink-0 h-6 w-6'
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='flex-shrink-0 w-14'></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center flex-shrink-0 px-4'>
                <CGateLogo className='h-20 w-auto' />
              </div>
              <nav className='mt-5 flex-1 px-2 bg-white space-y-1'>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}>
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
              <div className='flex justify-between flex-shrink-0 w-full group'>
                <div className='flex items-center'>
                  <div>
                    {user.user.image === "default.png" ? (
                      <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black object-cover border-white border-4'>
                        <span className='text-sm font-medium leading-none text-white'>
                          {user.user.nom[0].toUpperCase() +
                            user.user.prenom[0].toUpperCase()}
                        </span>
                      </span>
                    ) : (
                      <img
                        className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                        src={user.user.image}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                      {user.user.nom + " " + user.user.prenom}
                    </p>
                  </div>
                </div>
                <div className='w-fit p-3 text-gray-400 group-hover:text-gray-500 cursor-pointer'>
                  <LogoutIcon
                    onClick={handleLogout}
                    className='flex-shrink-0 h-6 w-6'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:pl-64 flex flex-col flex-1'>
          <div className='sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 flex justify-between'>
            <button
              type='button'
              className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              onClick={() => setSidebarOpen(true)}>
              <span className='sr-only'>Open sidebar</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div>
              <SearchComponent />
            </div>
          </div>
          <main className='flex-1'>
            <div className=''>
              {/* Replace with your content */}

              <Outlet />

              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ManagerSidebar;
