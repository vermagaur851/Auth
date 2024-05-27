import { request } from "https";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicpath = path === '/signup' || path === '/login' || path === '/verifyemail'
    const token = request.cookies.get("token")?.value || ''

    if (isPublicpath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if(!isPublicpath && !token){
        return NextResponse.redirect(new URL('/login',request.url))
    }

}

export const config = {
    matcher: ['/profile','/login','/signup','/verifyemail']
}