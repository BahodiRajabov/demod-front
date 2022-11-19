import { NextResponse } from "next/dist/server/web/spec-extension/response";
export default function middleware(req: any){
   let varify = req.cookies.get("accessToken")
   let url = req.url;
   if(!varify && url.includes('/profile')) {
      return NextResponse.redirect(new URL('/', url))
   }
}