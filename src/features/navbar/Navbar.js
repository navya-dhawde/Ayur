import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from "../auth/authSlice";
import AyuNavLogo from "../../assets/brand/AyuNavlogo.jpg";
import './NavBar.css'


const user = {
  name: "Shreya",
  email: "shreya@gmail.com",
  imageUrl: "",
};
const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Shop", link: "/shop", user: true },
  { name: "Plant ", link: "/plant-identification", user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-customWhite">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-10 py-6 flex justify-between items-center">
                  <div className="hidden md:block">
                    <div className="flex items-baseline space-x-4 nav-text">
                      {navigation.map(
                        (item) =>
                          item[user.role] && (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                ? 'bg-customMint text-black'
                                : 'text-black hover:bg-customMint hover:text-black',
                              'rounded px-3 py-2 text-sm font-medium'
                            )}
                              aria-current={
                                item.current ? "page" : undefined
                              }
                            >
                              {item.name}
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                  <Link to="/">
                    <div className="flex-shrink-0 nav-center-logo">
                      <img
                        src={AyuNavLogo}
                        className="ayu-logo"
                        alt=""
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                  </Link>
                

                <div className="flex items-center">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="z-40 relative flex max-w-xs items-center rounded-full bg-customWhite text-sm ">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.link}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <div className="flex items-center justify-center ml-4 pt-5">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full bg-customWhite p-1 text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-customMint focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          {items.length > 0 && (
                            <span className="z-10 inline-flex items-center ml-1 -mt-1 rounded-md bg-red-100 px-1.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {items.length}
                            </span>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      as="a"
                      to={item.link}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        as="a"
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
