import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { signIn } from "next-auth/react";

export const Menu_landing = () => {
  return (
    <div className=" text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg
              className="h-7"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-3">
              <Menu.Item>
                <Link href="/" className="p-2">
                  Home
                </Link>
              </Menu.Item>
            </div>
            <div className="p-3">
              <Menu.Item>
                <Link href="/app" className="p-2">
                  App
                </Link>
              </Menu.Item>
            </div>
            <div className="p-3">
              <Menu.Item>
                <Link href="/about" className="p-2 ">
                  About
                </Link>
              </Menu.Item>
            </div>
            <div className="p-3">
              <Menu.Item>
                <Link href="/contact" className="p-2 ">
                  Contact
                </Link>
              </Menu.Item>
            </div>
            <div className="p-3 ">
              <Menu.Item>
                <Link href="" className="p-2 " onClick={() => signIn()}>
                  Sign In
                </Link>
              </Menu.Item>
            </div>
            <div className="p-3">
              <Menu.Item>
                <Link href="/sing-up" className="p-2 ">
                  Get Started
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
