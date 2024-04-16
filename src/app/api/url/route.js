import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from 'nanoid'
import URLs from "@/app/models/url";
import  { connect } from '../../dbConfig/dbConnection'

connect()

export async  function POST(request){
   
  try {

    //getting body data
    const reqBody = await request.json();
    const {URL} = reqBody
    console.log('>>>>>>>>>>>body data', URL);

    
    if(!URL){
      return  NextResponse.json({
        error: "Body data not received",
        success: false,
      }, { status: 400 });
    }


    //generating nano id
    const nanoid = customAlphabet('1234567890abcdef', 10)
    const shortURL = nanoid() 
    console.log('>>>>>>>>>>>nano id',shortURL)

    
    const newURL =   new URLs({
      shortURL
      redirectURL : URL,
    })
    
    const savedURL = await newURL.save();


    // Return a successful response with the query parameters
    return NextResponse.json({
      savedURL,
      success: true,
    });

  } catch (error) {
    return  NextResponse.json({
      error: "Internal server error",
      success: false,
    }, { status: 500 });
  }
  
}