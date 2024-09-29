import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../dbConfig/dbConnection";
import Users from "../../models/user.model";
import { hash } from "bcryptjs";

connect();


export async function POST(request) {
  try {
    console.log(">>>>>>>>>>>inside fun");
    //getting body data
    const reqBody = await request.json();
    let { name, email, password, } = reqBody;
    console.log(">>>>>>>>>>>body data", name, email, password);

    if (!email || !name || !password) {
      return NextResponse.json(
        {
          error: "something error occurs",
          success: false,
        },
        { status: 400 }
      );
    }

    let user = await Users.findOne({ email }).select("+password");
    console.log(">>>>>>>>>>>user", user);

    if (!user) {
      //hashing user password
      const hashedPassword = await hash(password, 10);
      console.log('>>>>>>>>>>>hashed password', hashedPassword)
      // create new user

    
      // create new user
      const newUser = new Users({ 
        name,
        email,
        password: hashedPassword,
        URLs : []
      });

      const createdUser = await newUser.save(); // Save the new user instance

      // Return a successful response with the query parameters
      return NextResponse.json(
        {
          createdUser,
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "user already exist",
          success: false,
        },
        { status: 400 }
      );
    }
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
