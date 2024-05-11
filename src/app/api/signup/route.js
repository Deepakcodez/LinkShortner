import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConnection";
import Users from "../../models/user.model";
import { hash } from "bcryptjs";

connect();

export async function POST(request) {
  try {
    //getting body data
    const reqBody = await request.json();
    let { name, email, password } = reqBody;
    console.log(">>>>>>>>>>>body data", name, email, password);

    if (!email || !password || !password) {
      return NextResponse.json(
        {
          error: "something error occurs",
          success: false,
        },
        { status: 400 }
      );
    }

    
    let user = await Users.findOne({ email });
    console.log(">>>>>>>>>>>url in db", user);

   if(user) throw new Error("User already exist")
 


    //hashing user password
    const hashedPassword = await hash(password,10)
// create new user
    
Users.create({
    name,
    email,
    password : hashedPassword,
})
    const createdUser = await Users.save()
    // Return a successful response with the query parameters
    return NextResponse.json(
      {
        createdUserF,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
