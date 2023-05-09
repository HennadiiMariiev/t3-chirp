import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

console.log("middleware");

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
