import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import URLs from "../../models/url";
import { connect } from "../../dbConfig/dbConnection";
import { auth } from "../../../auth";
import Users from "../../models/user.model";

connect();

// Force the API to use the Node.js runtime
export const runtime = "nodejs"

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        {
          error: "User not authenticated",
          success: false,
        },
        { status: 401 }
      );
    }

    const email = session.user.email;

    //getting body data
    const reqBody = await request.json();
    const { URL } = reqBody;

    if (!URL) {
      return NextResponse.json(
        {
          error: "URL not provided",
          success: false,
        },
        { status: 400 }
      );
    }

   
    
    

    // Generating nanoid
    const nanoid = customAlphabet("1234567890abcdef", 10);
    const shortURL = nanoid();

    let urlDocument = await URLs.findOne({ redirectURL: URL });

    if (!urlDocument) {
      urlDocument = new URLs({
        shortURL,
        redirectURL: URL,
        clickes: 0,
      });
    }

    // Increasing clickes in every api hit whether it exists or not
    urlDocument.clickes += 1;
    const savedURL = await urlDocument.save();

    // Updating user URLs array
    if(email){
      const user = await Users.findOne({ email });
      console.log('>>>>>>>>>>> user --->', user)

      user.urls.push(shortURL);
      await user.save();
    }

    // Returning a successful response with the saved URL
    return NextResponse.json(
      {
        savedURL,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
