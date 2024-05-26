import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        console.log(user)
        if (!user) {
            return NextResponse.json({ error: "Invalid Token detail" }, { status: 400 })
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save();
        return NextResponse.json({ message: "User verified succesfully !!", success: true }, { status: 500 })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}