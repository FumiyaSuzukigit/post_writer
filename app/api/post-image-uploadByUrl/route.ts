import { NextResponse } from "next/server";
import uploadToCloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const imageUrl = body.url;

    if (!imageUrl) {
      throw new Error("No URL provided");
    }

    const uploadResponse = await uploadToCloudinary(
      imageUrl,
      "post-writer/post"
    );

    return NextResponse.json({
      success: true,
      file: { url: uploadResponse.secure_url },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({
      success: false,
      error: "An unknown error occurred",
    });
  }
}
