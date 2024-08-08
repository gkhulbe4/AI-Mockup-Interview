import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import db from "./db";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

export async function initialProfile() {
  const user = await currentUser();
  if (!user) {
    return RedirectToSignIn;
  }

  const profile = await db.query.User.findFirst({
    where: eq(schema.User.userId, user.id),
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.insert(schema.User).values({
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName} ${user.lastName}`,
    userId: user.id,
  });
  return newProfile;
}
