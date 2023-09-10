import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // APIはBasic認証をしない
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/")) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const auth = basicAuth.split(" ")[1];
      const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

      if (user === "nishio" && pwd === "daiki") {
        return NextResponse.next();
      }
    }

    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }
}
