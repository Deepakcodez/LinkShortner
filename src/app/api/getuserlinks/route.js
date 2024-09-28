import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConnection";
import { auth } from "../../../auth";
import Users from "../../models/user.model";

connect();

export async function GET(request) {
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
    let urls = []
    // Updating user URLs array
    if(email){
      const user = await Users.findOne({ email });
      console.log('>>>>>>>>>>> user --->', user)
       urls = user.urls;
    }

    // Returning a successful response with the saved URL
    return NextResponse.json(
      {
        urls,
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
