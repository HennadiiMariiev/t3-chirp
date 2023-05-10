import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import * as React from "react";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/custom.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
