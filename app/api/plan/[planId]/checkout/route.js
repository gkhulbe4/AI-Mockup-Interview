import db from "@/utils/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Plan, User, StripeCustomer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  //   console.log(params.planId);
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // console.log("CLERK USER ID", user.id);

    const getUser = await db.query.User.findFirst({
      where: eq(User.userId, user.id),
    });

    if (!getUser) {
      return new NextResponse("UserID not found", { status: 404 });
    }
    // console.log("USER ID", getUser.id);

    const getPlan = await db.query.Plan.findFirst({
      where: eq(Plan.id, params.planId),
    });
    // console.log("PLAN ID", getPlan.id);

    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: getPlan.title,
          },
          unit_amount: getPlan.price,
        },
      },
    ];

    let stripeCustomerId;
    let stripeCustomer = await db.query.StripeCustomer.findFirst({
      where: eq(StripeCustomer.userId, user.id),
      columns: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
      });

      const newStripeCustomer = await db
        .insert(StripeCustomer)
        .values({
          userId: user.id,
          stripeCustomerId: customer.id,
        })
        .returning({ stripeCustomerId: StripeCustomer.stripeCustomerId });
      stripeCustomerId = newStripeCustomer[0].stripeCustomerId;
    } else {
      stripeCustomerId = stripeCustomer.stripeCustomerId;
    }

    // console.log(stripeCustomerId);

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      metadata: {
        planId: params.planId,
        userId: user.id,
        coins: getPlan.coins,
      },
    });
    // console.log("URL", session.url);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}
