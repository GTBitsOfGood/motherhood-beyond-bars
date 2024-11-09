import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken"); // Get the token from cookies
  const url = req.nextUrl.clone();
  const referer = req.headers.get("referer");

  const caregiverHome = "caregiver/book";
  const adminHome = "admin/caregivers";
  const caregiverOnboarding = "caregiver/onboarding";

  // If referer exists, parse it and extract the pathname
  let refererPathname = null;
  if (referer) {
    const refererUrl = new URL(referer);
    refererPathname = refererUrl.pathname;
  }

  // Redirect to login if no token is present
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Call the API route to decode the token and get the user's role and ID
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      url.pathname = "/403"; // Redirect to a custom 403 page or any other page
      return NextResponse.redirect(url);
    }

    const result = await response.json();

    if (!result.success) {
      url.pathname = "/403"; // TODO figure out if this should be 403 or login
      return NextResponse.redirect(url);
    }

    const isAdmin = result.isAdmin;

    // Role-based redirection from "/home"
    if (req.nextUrl.pathname === "/home") {
      url.pathname = isAdmin ? adminHome : caregiverHome;
      return NextResponse.redirect(url);
    }

    // Handle Onboarding route
    if (req.nextUrl.pathname === "/onboarding") {
      url.pathname = isAdmin ? adminHome : caregiverOnboarding;
      return NextResponse.redirect(url);
    }

    // Admins can access any page
    if (isAdmin) {
      return NextResponse.next();
    }

    // Caregivers can't access admin pages
    if (!isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
      url.pathname = caregiverHome;
      return NextResponse.redirect(url);
    }

    // Don't allow caregiver to access caregiver pages unless completed onboarding
    if (
      !isAdmin &&
      req.nextUrl.pathname.startsWith("/caregiver") &&
      !req.nextUrl.pathname.includes("onboarding")
    ) {
      const isOnboarding = result.onboarding;
      if (isOnboarding) {
        return NextResponse.next();
      } else {
        url.pathname = caregiverOnboarding;
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next(); // Token exists, allow access
  } catch (error) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/caregiver/:path*", "/home", "/"],
};
