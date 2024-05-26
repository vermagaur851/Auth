import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/datafromtoken";

connect();
export async function GET(request: NextRequest) {
    try {
        // extract data from token
        const id = await getDataFromToken(request)
        if(id==="NO TOKEN FOUND"){
            return NextResponse.json({message:"no token found"},{status:404})
        }
        const user = await User.findById({_id:id}).select("-password")
        // check if there is no user
        return NextResponse.json({message : "User found", data : user})

    } catch (error: any) {
        return NextResponse.json({ err: error, status: 501 })
    }
}