"use client";

import { Copy } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { catchError, cn } from "@/lib/utils";

interface CopyToClipboardProps {
  textToCopy: string;
  className?: string;
  icon?: boolean;
}

const CopyToClipboard = React.memo(
  ({ textToCopy, icon = false, className }: CopyToClipboardProps) => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to Clipboard");
      } catch (err) {
        catchError(err);
      }
    };

    return (
      <Button
        onClick={copyToClipboard}
        size={icon ? "icon" : "sm"}
        className={cn(icon && "h-9 w-9", className)}
      >
        {icon ? <Copy className="h-4 w-4" /> : "Copy"}
      </Button>
    );
  }
);
CopyToClipboard.displayName = "CopyToClipboard";

export { CopyToClipboard };
