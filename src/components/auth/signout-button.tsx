"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { unauthenticate } from "@/lib/actions";
import { catchError } from "@/lib/utils";

const SignoutButton = ({
  auth,
}: {
  auth: { title: string; cancel: string };
}) => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await unauthenticate();
      } catch (err) {
        catchError(err);
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        onClick={() => router.back()}
        className="w-full text-sm"
      >
        {auth.cancel}
        <span className="sr-only">Previous page</span>
      </Button>
      <Button
        onClick={handleSignOut}
        isLoading={isPending}
        className="w-full text-sm"
      >
        {auth.title}
        <span className="sr-only">{appConfig.auth.signout.title}</span>
      </Button>
    </div>
  );
};

export { SignoutButton };
