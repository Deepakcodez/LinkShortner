import { auth } from "./auth";
import { NextResponse, Response } from "next/server";
import { getToken } from 'next-auth/jwt';

// Define the middleware function
export default auth(async(req) => {
  console.log('>>>>>>>>>>>from middleware', req.auth)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("token",token)
  const { pathname } = req.nextUrl;


  if (!token && pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
}

// Allow the request if authenticated or accessing non-protected routes
return NextResponse.next();

 
});

// Export configuration for the middleware
export const config = {
  // Define the URL paths where this middleware should be applied
  // paths: ['/auth/signin',],
  matcher: ['/profile/:path*'], // Protect all routes under /profile

};
