import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function getCurrentProfile() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}
