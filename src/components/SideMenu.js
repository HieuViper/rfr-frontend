"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <></>
  ) : (
    <div className="">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <RxHamburgerMenu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <IoClose onClick={() => setIsOpen(false)} size={20} />
          </DrawerHeader>
          <div className="p-5 mb-15">
            <div className="mt-5">
              <h2 className="text-2xl font-medium text-center">
                Enter Spacest.com
              </h2>
              <p className="text-slate-400 text-center text-sm my-2">
                Every month we help thousands of people find a home or a tenant.
                Join them too
              </p>
              <Button className="rounded-full w-10/12 mx-auto block mt-5">
                Log in
              </Button>
            </div>

            <hr className="mt-10" />

            <div className="shadow-lg p-4 rounded-lg my-8">
              <span className="text-xs text-slate-600 mb-4 uppercase">
                search
              </span>
              <a href="/">
                <div className="text-sm flex items-center gap-4 my-4">
                  <IoSearchOutline size={18} />
                  Rent a listing
                </div>
              </a>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideMenu;
