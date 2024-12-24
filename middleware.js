import { NextResponse } from "next/server";

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/")
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(`/en-GB/`, req.url)
    );
  }
}
