import React from "react";
import clx from "classnames";

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clx("mx-auto w-full px-4 2xl:w-[1440px]", className)}>
      {children}
    </div>
  );
}

export default Container;
