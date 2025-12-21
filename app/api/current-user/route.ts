import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user } = await serverAuth();
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
