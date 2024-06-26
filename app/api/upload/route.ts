import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import uploadToCloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fileStr = body.data;

    const uploadResponse = await uploadToCloudinary(
      fileStr,
      "post-writer/icon"
    );

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { image: uploadResponse.secure_url },
    });

    const session = await getServerSession(authOptions);

    if (session && session.user) {
      session.user.image = uploadResponse.secure_url;
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ success: false, error: error.message });
    }
    console.error("Unknown error:", error);
    return NextResponse.json({
      success: false,
      error: "An unknown error occurred",
    });
  }
}
