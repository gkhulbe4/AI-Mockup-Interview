import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull().unique(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const UserRelations = relations(User, ({ many, one }) => ({
  mockInterviews: many(MockInterview),
  userAnswers: many(UserAnswer),
  purchases: many(Purchases),
  stripeCustomer: one(StripeCustomer),
  coins: one(UserCoins),
}));

export const MockInterview = pgTable("MockInterview", {
  id: serial("id").primaryKey(),
  mockId: varchar("mockId").notNull(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  done: boolean("done").notNull().default(false),
  createdBy: varchar("createdBy")
    .notNull()
    .references(() => User.userId),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const MockInterviewRelations = relations(MockInterview, ({ one }) => ({
  user: one(User, {
    fields: [MockInterview.createdBy],
    references: [User.userId],
  }),
}));

export const UserAnswer = pgTable("UserAnswer", {
  id: serial("id").primaryKey(),
  mockId: varchar("mockId").notNull(),
  userId: varchar("userId")
    .notNull()
    .references(() => User.userId),
  question: varchar("question").notNull(),
  correctAns: text("correctAns").notNull(),
  userAns: text("userAns"),
  feedback: text("feedback").notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const UserAnswerRelations = relations(UserAnswer, ({ one }) => ({
  user: one(User, {
    fields: [UserAnswer.userId],
    references: [User.userId],
  }),
}));

export const StripeCustomer = pgTable("StripeCustomer", {
  id: serial("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => User.userId),
  stripeCustomerId: varchar("stripeCustomerId").unique(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const StripeCustomerRelations = relations(StripeCustomer, ({ one }) => ({
  user: one(User, {
    fields: [StripeCustomer.userId],
    references: [User.userId],
  }),
}));

export const UserCoins = pgTable("UserCoins", {
  id: serial("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => User.userId),
  numberOfCoins: integer("numberOfCoins").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  updatedAt: varchar("updatedAt"),
});

export const UserCoinsRelations = relations(UserCoins, ({ one }) => ({
  user: one(User, {
    fields: [UserCoins.userId],
    references: [User.userId],
  }),
}));

export const Plan = pgTable("Plan", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  price: real("price").notNull(),
  coins: integer("coins").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const PlanRelations = relations(Plan, ({ many }) => ({
  purchases: many(Purchases),
}));

export const Purchases = pgTable("Purchases", {
  id: serial("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => User.userId),
  planId: integer("planId")
    .notNull()
    .references(() => Plan.id),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
});

export const PurchasesRelations = relations(Purchases, ({ one }) => ({
  user: one(User, {
    fields: [Purchases.userId],
    references: [User.userId],
  }),
  plan: one(Plan, {
    fields: [Purchases.planId],
    references: [Plan.id],
  }),
}));
