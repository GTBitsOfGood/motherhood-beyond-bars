import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Get the token from cookies

  const url = req.nextUrl.clone();

  if (!token) {
    // Redirect to login if no token is found
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Call the API route to verify the token and check the user's role
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch token verification. Status:",
        response.status
      );
      const errorText = await response.text(); // Log the actual response body
      console.error("Response body:", errorText); // Log the response text
      throw new Error("API request failed.");
    }

    const result = await response.json(); // Parse the JSON response

    if (!result.success) {
      // If token verification fails, redirect to login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const isAdmin = result.isAdmin;

    // Redirect caregivers from admin pages
    if (!isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
      url.pathname = "/caregiver/babyBook";
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Allow access if user is authorized
  } catch (error) {
    console.error("Error in middleware:", error);
    url.pathname = "/login";
    return NextResponse.redirect(url); // Redirect to login if something goes wrong
  }
}

export const config = {
  matcher: ["/admin/:path*", "/caregiver/:path*"],
};
