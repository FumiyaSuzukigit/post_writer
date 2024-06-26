import { NextResponse } from "next/server";
import uploadToCloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("image");

    if (!file || !(file instanceof Blob)) {
      throw new Error("No file uploaded or file is not a Blob");
    }

    const uploadResponse = await uploadToCloudinary(file, "post-writer/post");

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
