"use client";

import { Shell } from "@/components/shared/shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Block } from "@/types/dash";

const NotActive = ({ data, email }: { data: Block; email?: string | null }) => {
  const handleContactSupportClick = () => {
    window.dispatchEvent(
      new CustomEvent("populateEmailForm", {
        detail: { email: email },
      })
    );
  };
  return (
    <Shell className="max-w-lg">
      <Card className={cn("bg-destructive/30")}>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>{data.desc}</CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size={"sm"}
            onClick={handleContactSupportClick}
          >
            {data.action}
          </Button>
        </CardFooter>
      </Card>
    </Shell>
  );
};

export { NotActive };
