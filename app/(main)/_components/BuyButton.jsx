"use client";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

function BuyButton({ planId }) {
  async function buyPlan() {
    try {
      const res = await axios.post(`/api/plan/${planId}/checkout`);
      console.log(res);
      window.location.assign(res.data.url);
    } catch (error) {
      toast.error("An error occurred");
    }
  }
  return (
    <button
      onClick={buyPlan}
      className="mt-8 block rounded-full border border-blue-500 bg-white px-12 py-3 text-center text-sm font-medium text-blue-500 hover:ring-1 hover:ring-blue-500"
    >
      Buy
    </button>
  );
}

export default BuyButton;
