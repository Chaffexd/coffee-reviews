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
    let country: string | undefined;

    // 1. try IP geolocation
    try {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "";
      console.log("Client IP:", ip);
      const geoRes = await fetch(`https://ipapi.co/${ip}/country/`);
      console.log("Geolocation response status:", geoRes);
      if (geoRes.ok) {
        country = (await geoRes.text()).trim();
      }
    } catch {
      // ipapi.co failed, fall through to Accept-Language
    }

    // 2. fallback to Accept-Language header
    if (!country) {
      const acceptLanguage = req.headers.get("accept-language") ?? "";
      const browserLocale = acceptLanguage.split(",")[0];
      const parts = browserLocale.split("-");
      country = parts[parts.length - 1] ?? "GB";
    }

    const locale =
      req.cookies.get("NEXT_LOCALE")?.value ||
      localesByCountry[country] ||
      "en-GB";

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    );

    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

    return response;
  }
}
