import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from 'nanoid'
import URLs from "../../models/url";
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

     
    let urlDocument = await URLs.findOne({ redirectURL: URL });
   console.log('>>>>>>>>>>>', urlDocument)  
  
    if(!urlDocument){
      const urlDocument =   new URLs({
        shortURL,
        redirectURL : URL,
        clickes : 0,
      })
    }
    
    // increasing clickes in every api hit wheater it is exist or not 
    // if not than firstly create the entry than increase by 1
    urlDocument.clickes += 1;

    const savedURL = await urlDocument.save();


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