import { auth } from "./auth";
import { NextResponse, Response } from "next/server";

// Define the middleware function
export default auth((req) => {
  console.log('>>>>>>>>>>>from middleware', req.auth)

//   if (!req.auth) {
//     // If the user is not authenticated, redirect to the signin page
//     const url = req.url.replace(req.nextUrl.pathname, "/");
//     return NextResponse.redirect(new URL('/',req.url));
//   }
 
});

// Export configuration for the middleware
export const config = {
  // Define the URL paths where this middleware should be applied
  paths: ['/auth/signin',],
};
