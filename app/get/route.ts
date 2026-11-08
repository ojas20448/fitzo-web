import { NextRequest, NextResponse } from "next/server";
import { SITE_URL, STORE } from "@/lib/links";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const destination = /iPhone|iPad|iPod/i.test(userAgent)
    ? STORE.ios
    : /Android/i.test(userAgent)
      ? STORE.android
      : `${SITE_URL}/#download`;

  const response = NextResponse.redirect(destination, 302);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "User-Agent");
  return response;
}
