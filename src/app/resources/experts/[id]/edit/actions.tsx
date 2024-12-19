"use server";

import { revalidatePath } from "next/cache";
import prisma from "@expo/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const ExpertSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
});

export async function updateExpert(formData: FormData): Promise<void> {
  const data = {
    id: formData.get("id") as string,
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    bio: formData.get("bio") as string,
  };

  try {
    const validatedData = ExpertSchema.parse(data);

    await prisma.user.update({
      where: { id: validatedData.id },
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        bio: validatedData.bio || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/experts/${validatedData.id}`);
    redirect(`/experts/${validatedData.id}`);
  } catch (error) {
    throw error;
  }
}
