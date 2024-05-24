import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ VerifyToken: token, VerifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid Token detail" }, { status: 400 })
        }
        user.isVerified = true
        user.VerifyToken = undefined
        user.VerifyTokenExpiry = undefined

        await user.save();
        return NextResponse.json({ message: "User verified succesfully !!", success: true }, { status: 500 })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}