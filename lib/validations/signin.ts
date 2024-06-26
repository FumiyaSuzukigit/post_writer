import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z.string(),
});

export type signInSchemaType = z.infer<typeof signInSchema>;
