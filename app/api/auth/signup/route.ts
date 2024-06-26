// app/api/signup/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { signUpSchema } from "@/lib/validations/signup";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    signUpSchema.parse({ name, email, password });
  } catch (error) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
