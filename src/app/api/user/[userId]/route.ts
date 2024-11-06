import { auth } from "@/auth";
import { getUserById } from "@/lib/queries/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(null, { status: 401 });
    }

    const user = await getUserById(params.userId);
    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json({
      role: user.role,
      username: user.username,
      status: user.status,
      image: user.image,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
