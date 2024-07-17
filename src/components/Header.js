import Image from "next/image";
import Link from "next/link";
import { PiCaretDownThin, PiQuestionLight } from "react-icons/pi";
import SideMenu from "./SideMenu";

const Header = () => {
  return (
    <header className="px-5 py-2 h-14 md:h-[80px] w-full flex items-center justify-between border-b shadow sticky top-0 z-50 bg-white">
      <Link
        href={"/"}
        className="relative cursor-pointer md:pl-5 pl-3 flex items-center w-[200px] h-full"
      >
        <Image
          src={"/image/logo.png"}
          alt="logo"
          fill
          priority
          sizes="200px"
          className="w-full h-auto object-contain"
        />
      </Link>

      <div className="md:flex hidden items-center h-full">
        <div className="group hover:bg-slate-100 hover:border-b-2 hover:border-b-slate-400 h-full flex items-center gap-1 px-2 select-none">
          <div className="flex items-center gap-1 rounded-full shadow-lg p-3 bg-white">
            <span className="group-hover:text-emerald-400 text-sm">
              Bạn là người cho thuê?
            </span>
            <PiCaretDownThin size={16} />
          </div>
        </div>
        <div className="group hover:bg-slate-100 hover:border-b-2 hover:border-b-slate-400 h-full flex items-center px-2 cursor-pointer">
          <span className="group-hover:text-emerald-400 text-sm">
            Cách thuê
          </span>
        </div>
        <div className="group hover:bg-slate-100 hover:border-b-2 hover:border-b-slate-400 h-full flex items-center px-2 cursor-pointer">
          <PiQuestionLight size={26} className="group-hover:text-emerald-400" />
        </div>
      </div>

      <SideMenu />
    </header>
  );
};

export default Header;
