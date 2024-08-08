import { stripe } from "@/lib/stripe";
import db from "@/utils/db";
import { Purchases, UserCoins } from "@/utils/schema";
import "dotenv/config";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;
  //   console.log(session);
  const userId = session?.metadata?.userId;
  const planId = session?.metadata?.planId;
  const coins = session?.metadata?.coins;

  //   console.log(userId, planId, coins);

  if (event.type === "checkout.session.completed") {
    if (!userId || !planId || !coins) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }
    await db.insert(Purchases).values({
      planId: planId,
      userId: userId,
    });

    const getUser = await db.query.UserCoins.findFirst({
      where: eq(UserCoins.userId, userId),
    });
    if (getUser) {
      await db
        .update(UserCoins)
        .set({
          numberOfCoins: sql`${UserCoins.numberOfCoins} + ${coins}`,
          updatedAt: new Date(),
        })
        .where(eq(UserCoins.userId, userId))
        .returning({ userId: UserCoins.userId });
      //   console.log("UPDATED", updated);
    } else {
      await db
        .insert(UserCoins)
        .values({
          userId: userId,
          numberOfCoins: parseInt(coins),
        })
        .returning({ userId: UserCoins.userId });
      //   console.log("NEW", insertCoins);
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unsupported event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
