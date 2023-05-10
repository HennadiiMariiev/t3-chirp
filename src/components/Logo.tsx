import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      title="t3-Chirp logo"
      className="logo flex cursor-pointer items-center font-bold"
    >
      <Image
        src={"/black-bird.png"}
        alt="Logo"
        width={40}
        height={40}
        className="rounded-full bg-white p-0.5 sm:mr-3"
      />
      <span className="hidden text-[20px] sm:inline">t3-Chirp</span>
    </Link>
  );
}

export default Logo;
