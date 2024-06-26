import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, published } = await req.json();

    if (!id || typeof published !== "boolean") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const post = await db.post.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
