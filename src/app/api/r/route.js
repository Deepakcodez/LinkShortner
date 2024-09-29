// pages/api/redirect.js

import { NextResponse } from "next/server";
import URLs from "../../models/url";
import { connect } from "../../dbConfig/dbConnection";
connect();


export async function POST(request) {
  //getting body data
  const reqBody = await request.json();
  const { shortId } = reqBody;

  let urlDocument = await URLs.findOne({ shortURL: shortId });
  const redirectTo = urlDocument.redirectURL;


  if (!redirectTo) {
    return NextResponse.json(
      {
        error: "Redirect URL not provided",
        success: false,
      },
      { status: 400 }
    );
  }

  // Redirect the client to the specified URL
  return NextResponse.json({
    redirectTo,
    success: true,
  });
}
