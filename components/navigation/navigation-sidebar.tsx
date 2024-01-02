import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function NavigationSidebar() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      Navigation
    </div>
  );
}

export default NavigationSidebar;