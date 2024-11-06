import { authWithCredentials } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const credentials = await request.json();
    const user = await authWithCredentials(credentials);

    if (!user) {
      console.log("[Credentials api]: no user");
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
