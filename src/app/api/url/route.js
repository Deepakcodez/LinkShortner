import { NextResponse } from "next/server";

import  { connect } from '../../dbConfig/dbConnection'

connect()

export async  function GET(){
   console.log('>>>>>>>>>>>get request')
   return  NextResponse.json({
    message: "demo success",
    success: true,
  }, { status: 200 });
}