import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import SearchComponent from "@/components/search/search.component";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const navigation = [
  { name: "Planing", to: "/coll", current: false },
  { name: "profile", to: "profile", current: false },
];
const userNavigation = [
  { name: "Your Profile", to: "profile" },
  { name: "Sign out", to: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CollSidebar() {
  const [user] = useLocalStorage<any>("data");

  return (
    <>
      <div className='min-h-full '>
        <Popover
          as='header'
          className='pb-24 bg-gradient-to-r from-sky-600 to-sky-600'>
          {({ open }) => (
            <>
              <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                <div className='relative flex flex-wrap items-center justify-center lg:justify-between'>
                  {/* Logo */}
                  <div className='absolute left-0 py-5 lg:static'>
                    <NavLink to={""}>
                      <span className='sr-only'>Workflow</span>
                      <img
                        className='w-10'
                        src={require("@/common/images/CgateLogoLight.png")}
                        alt='_'
                      />
                    </NavLink>
                  </div>
                  <div className='text-white focus-within:text-gray-600'>
                    <SearchComponent />
                  </div>
                  {/* Right section on desktop */}
                  <div className='hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5'>
                    <button
                      type='button'
                      className='flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white'>
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-4 relative flex-shrink-0'>
                      <div>
                        <Menu.Button className='bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100'>
                          <span className='sr-only'>Open user menu</span>
                          {user.user.image === "default.png" ? (
                            <span className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-black object-cover border-white border-4'>
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
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }: any) => (
                                <NavLink
                                  to={item.to}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}>
                                  {item.name}
                                </NavLink>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className='w-full py-5 lg:border-t lg:border-white lg:border-opacity-20'>
                    <div className='lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center'>
                      {/* Left nav */}
                      <div className='hidden lg:block lg:col-span-2'>
                        <nav className='flex space-x-4'>
                          {navigation.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.to}
                              className={classNames(
                                item.current ? "text-white" : "text-cyan-100",
                                "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                              )}
                              aria-current={item.current ? "page" : undefined}>
                              {item.name}
                            </NavLink>
                          ))}
                        </nav>
                      </div>
                      <div className='px-12 lg:px-0'>
                        {/* Search */}
                        <div className='max-w-xs mx-auto w-full lg:max-w-md'>
                          <label htmlFor='search' className='sr-only'>
                            Search
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className='absolute right-0 flex-shrink-0 lg:hidden'>
                    {/* Mobile menu button */}
                    <Popover.Button className='bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XIcon className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className='lg:hidden'>
                  <Transition.Child
                    as={Fragment}
                    enter='duration-150 ease-out'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='duration-150 ease-in'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Popover.Overlay className='z-20 fixed inset-0 bg-black bg-opacity-25' />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter='duration-150 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-150 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'>
                    <Popover.Panel
                      focus
                      className='z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top'>
                      <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200'>
                        <div className='pt-3 pb-2'>
                          <div className='flex items-center justify-between px-4'>
                            <div>
                              <img
                                className='w-6 '
                                src={require("@/common/images/CgateLogoLight.png")}
                                alt='_'
                              />
                            </div>
                            <div className='-mr-2'>
                              <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500'>
                                <span className='sr-only'>Close menu</span>
                                <XIcon className='h-6 w-6' aria-hidden='true' />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className='mt-3 px-2 space-y-1'>
                            {navigation.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.to}
                                className='block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800'>
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                        <div className='pt-4 pb-2'>
                          <div className='flex items-center px-5'>
                            <div className='flex-shrink-0'>
                              {user.user.image === "default.png" ? (
                                <span className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-black object-cover border-white border-4'>
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
                            <div className='ml-3 min-w-0 flex-1'>
                              <div className='text-base font-medium text-gray-800 truncate'>
                                {user.user.nom} {user.user.prenom}
                              </div>
                              <div className='text-sm font-medium text-gray-500 truncate'>
                                {user.user.email}
                              </div>
                            </div>
                            <button
                              type='button'
                              className='ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                              <span className='sr-only'>
                                View notifications
                              </span>
                              <BellIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                          <div className='mt-3 px-2 space-y-1'>
                            {userNavigation.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.to}
                                className='block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800'>
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <div className='mx-52 -mt-20'>
          <Outlet />
        </div>

        <footer>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
            <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left'>
              <span className='block sm:inline'>
                &copy; 2022 les sentinelles 🛡
              </span>{" "}
              <span className='block sm:inline'>All rights reserved 😉.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
