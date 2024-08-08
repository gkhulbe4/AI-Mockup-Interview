import { Coins, PlusIcon } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PriceCards from "./PriceCards";
import db from "@/utils/db";
import { eq } from "drizzle-orm";
import * as schema from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";

async function UserCoins() {
  const user = await currentUser();
  const data = await db.query.UserCoins.findFirst({
    where: eq(schema.UserCoins.userId, user.id),
  });
  // console.log(data);
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-2 border rounded-lg px-3 py-2">
        <Coins color="#fed500" />
        <h1 className="text-gray-600 font-normal text-lg">
          {" "}
          {data?.numberOfCoins || 0}
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Dialog>
          <DialogTrigger>
            <PlusIcon className="bg-gray-300 hover:bg-gray-400 h-8 rounded-md cursor-pointer hover:scale-105 p-1 transition-all text-gray-600" />
          </DialogTrigger>
          <DialogContent className="max-w-max">
            <PriceCards />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default UserCoins;
