import Image from "next/image";
import Navl from "./Navl";
import Marquee from "./Marquee";

const Header = () => {
  const data = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-t border-orange-100 bg-[#f8faf9]">
      
      {/* Logo + Auth */}
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-1 sm:px-6">

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#07883f]">
            <Image
              src="/logo-icon.png"
              alt="বাজারের দর"
              width={50}
              height={50}
              priority
              className="h-6 w-6 object-contain brightness-0 invert"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-[21px] font-bold leading-[24px] text-[#202020]">
              বাজারের দর
            </h1>

            <p className="text-[12px] leading-[18px] text-gray-500">
              {data}
            </p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="text-[15px] font-medium text-[#222] transition-colors hover:text-green-700"
          >
            সাইন ইন
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#07883f] px-5 py-2.5 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#067536]"
          >
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Navigation */}
     <div className="mx-auto max-w-7xl border-t border-gray-200">
  <Navl />
</div>
<div>
    <Marquee/>
</div>

    </header>
  );
};

export default Header;