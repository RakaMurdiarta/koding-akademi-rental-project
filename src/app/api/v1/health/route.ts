import { NextRequest, NextResponse } from "next/server";

export async function GET(req : Request, res : Response) {
   
  return Response.json({
    data : "oke"
  })
}