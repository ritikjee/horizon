import { redirectToSignIn } from "@clerk/nextjs";

import { getCurrentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

async function InviteCodePage({ params: { inviteCode } }: InviteCodePageProps) {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const isExistingUser = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (isExistingUser) {
    return redirect(`/servers/${isExistingUser.id}`);
  }

  const res = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (res) {
    return redirect(`/servers/${res.id}`);
  }

  return null;
}

export default InviteCodePage;
