import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

async function ServerPage({ params }: ServerPageProps) {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (!server || !initialChannel) {
    return null;
  }

  if (initialChannel.name !== "general") {
    return null;
  }

  return redirect(`/servers/${server?.id}/channels/${initialChannel?.id}`);
}

export default ServerPage;
