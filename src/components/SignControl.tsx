import { SignInButton } from "@clerk/nextjs";
import React from "react";
import SignInIcon from "./icons/SignInIcon";
import { SignOutButton } from "@clerk/clerk-react";
import SignOutIcon from "./icons/SignOutIcon";

function SignControl({ isSignedIn = false }) {
  return (
    <>
      {!isSignedIn ? (
        <SignInButton>
          <button className="flex w-[120px] cursor-pointer items-center justify-center rounded bg-white px-3 py-2 text-center text-base text-violet-500 transition-all duration-300 hover:text-violet-800">
            <SignInIcon className="mr-2" width={24} />
            <span>Sign In</span>
          </button>
        </SignInButton>
      ) : (
        <SignOutButton>
          <button className="flex w-[120px] cursor-pointer items-center justify-center rounded bg-white px-3 py-2 text-center text-base text-violet-500 transition-all duration-300 hover:text-violet-800">
            <SignOutIcon className="mr-2" width={24} />
            <span>Sign Out</span>
          </button>
        </SignOutButton>
      )}
    </>
  );
}

export default SignControl;
