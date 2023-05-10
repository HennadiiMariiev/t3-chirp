import React from "react";
import Container from "./Container";

function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center border-b-[0.5px] border-neutral-700 bg-neutral-900 p-4">
      <Container className="flex justify-end">{children}</Container>
    </nav>
  );
}

export default NavBar;
