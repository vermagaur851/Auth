import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { error, log } from "console";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || ""
        if (token) {
            const data: any = jwt.verify(token, process.env.TOKEN_SECRET!)
            console.log(data.id);
            return data.id
        }
        return "NO TOKEN FOUND";
    } catch (err: any) {
        throw new Error(err.message)
    }
}