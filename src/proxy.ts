import { NextRequest, NextResponse } from "next/server";

export type IRole = 'ADMIN' | 'USER'
export interface IUser{
    username: string
}

export function proxy (request: NextRequest) {
    const userCookie = request.cookies.get("user")?.value;

    const {pathname} = request.nextUrl;
    const toUserPage = pathname.startsWith("/user")
    const toAdminPage = pathname.startsWith("/admin")
    const isNeedSession = toUserPage || toAdminPage

    if (isNeedSession){

        if(!userCookie){
            return NextResponse.redirect(new URL("/", request.url));
        }

        const user = JSON.parse(userCookie) as IUser

    if (toAdminPage && user.username === 'ADMIN') {
      return NextResponse.redirect(new URL("/", request.url));
    }
    }

    

    return NextResponse.next()
}