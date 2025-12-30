import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    return NextResponse.json({ success: true, data: currentUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
