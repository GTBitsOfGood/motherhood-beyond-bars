// import { NextRequest, NextResponse } from "next/server";
// import admin from "@lib/firebase/admin";

// export default async function middleware(req: NextRequest) {
//   if (process.env.NODE_ENV !== "production") {
//     return NextResponse.next();
//   }

//   const sessionCookie = req.cookies.session || "";
//   const decodedClaims = await admin
//     .auth()
//     .verifySessionCookie(sessionCookie, true);

//   if (!decodedClaims) {
//     return NextResponse.redirect("/login");
//   }

//   const user = (await admin.auth().getUser(decodedClaims.uid)) as any;
//   const isAdmin = user.customClaims["admin"];

//   if (!isAdmin) {
//     return NextResponse.redirect("/login");
//   }

//   return NextResponse.next();
// }

import { NextResponse } from "next/server";

export default async function middleware(_req: NextResponse) {
  return NextResponse.next();
}
