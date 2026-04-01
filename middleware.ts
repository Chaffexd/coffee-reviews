import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const localesByCountry: Record<string, string> = {
  US: "en-US",
  GB: "en-GB",
  TW: "zh-Hant-TW",
  FR: "fr-FR",
  DE: "de-DE",
  JP: "ja-JP",
  KR: "ko-KR",
};

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (!req.nextUrl.locale || req.nextUrl.locale === "default") {
    const geo = (req as NextRequest & { geo?: { country?: string } }).geo;
    const country = geo?.country ?? "GB";
    const locale =
      req.cookies.get("NEXT_LOCALE")?.value || // respect manual cookie override first
      localesByCountry[country] || // then try geo
      "en-GB"; // final fallback

    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    );
  }
}
