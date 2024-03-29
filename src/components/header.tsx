import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "apollo";
import { useHistory } from "react-router-dom";

// 아이콘
import compnayLogo from "images/companyLogo.svg";
import { GrMenu } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";
import { LOCALSTORAGE_TOKEN } from "../constants";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Team", href: "/", current: false },
  { name: "Projects", href: "/", current: false },
  { name: "Calendar", href: "/", current: false },
];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface IHeaderProps {}

export const HeaderComponet: React.FC<IHeaderProps> = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  const goLoginPage = () => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      console.log("로그인 됨");
    }
  };

  const signOut = (e: any) => {
    e.preventDefault();
    sessionStorage.removeItem(LOCALSTORAGE_TOKEN);
    history.go(0);
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8 container">
            <div className="relative flex items-center justify-between h-16 ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <GrMenu className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <GrMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* 회사 로고 */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={compnayLogo}
                    alt="compnayLogo"
                    onClick={goHome}
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={compnayLogo}
                    alt="compnayLogo"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6 ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) =>
                    !isLoggedIn ? (
                      <>
                        <div>
                          {/* 로그인 전  아이콘*/}

                          <BiUserCircle
                            className="block h-6 w-6"
                            aria-hidden="true"
                            onClick={goLoginPage}
                          ></BiUserCircle>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={signOut}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )
                  }
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-red-600">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
