import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import URLs from "../../models/url";
import { connect } from "../../dbConfig/dbConnection";
import { auth } from "../../../auth";
import Users from "../../models/user.model";

connect();

export async function POST(request) {
  try {
    // Check if the user is authenticated
    const session = await auth();

    // Get the body data
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

    // Generate nanoid
    const nanoid = customAlphabet("1234567890abcdef", 10);
    const shortURL = nanoid();

    // Check if the URL already exists
    let urlDocument = await URLs.findOne({ redirectURL: URL });

    if (!urlDocument) {
      // Create a new URL entry if it doesn't exist
      urlDocument = new URLs({
        shortURL,
        redirectURL: URL,
        clickes: 0,
      });
    }

    // Increase the click count
    urlDocument.clickes += 1;
    const savedURL = await urlDocument.save();

    // If user is authenticated, update user's URL array
    if (session && session.user && session.user.email) {
      const email = session.user.email;
      const user = await Users.findOne({ email });

      if (user) {
        user.urls.push(shortURL); // Add short URL to the user's URL array
        await user.save();
      }
    }

    // Return the short URL regardless of user authentication
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
