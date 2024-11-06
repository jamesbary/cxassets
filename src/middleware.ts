import i18nConfig from "@/i18nConfig";
import NextAuth from "next-auth";
import { i18nRouter } from "next-i18n-router";
import { NextResponse } from "next/server";

import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  // Handle i18n routing first
  const i18nResponse = i18nRouter(req, i18nConfig);
  if (i18nResponse) return i18nResponse;

  // If no i18n redirect is needed, proceed with default behavior
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
