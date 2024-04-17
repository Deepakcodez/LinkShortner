// pages/api/redirect.js

import { NextResponse } from "next/server";
import URLs from "@/app/models/url";
import  { connect } from '../../../dbConfig/dbConnection'
connect()


export async function GET(reqest,params) {

  const shortId =  params.params.shortId
  console.log('>>>>>>>>>>>', shortId)

  let urlDocument = await URLs.findOne({shortURL : shortId });

  const redirectTo = urlDocument.redirectURL
 
  console.log('>>>>>>>>>>>', redirectTo)
  
  if (!redirectTo) {
    return NextResponse.json({
      error: "Redirect URL not provided",
      success: false,
    }, { status: 400 });
  }

  // Redirect the client to the specified URL
  return NextResponse.redirect(redirectTo);
}
