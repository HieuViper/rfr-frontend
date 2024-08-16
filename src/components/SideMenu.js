"use client";

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
  return (
    <div className="md:hidden">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button aria-label="Open menu">
            <RxHamburgerMenu />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <IoClose onClick={() => setIsOpen(false)} size={20} />
          </DrawerHeader>
          <div className="p-5 mb-15">
            <div className="mt-5">
              <h2 className="text-2xl font-medium text-center">
                <b>RFR</b> - Room For Rent
              </h2>
              <p className="text-slate-400 text-center text-sm my-2">
                Mỗi tháng chúng tôi giúp hàng ngàn người tìm kiếm phòng trọ hoặc
                nhà trọ. Hãy để chúng tôi giúp bạn.
              </p>
              <a href={"https://cms.rfr.vn/login"} target="_blank">
                <Button className="rounded-full w-10/12 mx-auto block mt-5">
                  Đăng nhập
                </Button>
              </a>
              <a href={"https://cms.rfr.vn/register"} target="_blank">
                <Button className="rounded-full w-10/12 mx-auto block mt-5">
                  Đăng ký
                </Button>
              </a>
            </div>

            <hr className="mt-10" />

            <div className="shadow-lg p-4 rounded-lg my-8">
              <span className="text-xs text-slate-600 mb-4 uppercase">
                Tìm kiếm
              </span>
              <a href="/">
                <div className="text-sm flex items-center gap-4 my-4">
                  <IoSearchOutline size={18} />
                  Thuê Phòng
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
