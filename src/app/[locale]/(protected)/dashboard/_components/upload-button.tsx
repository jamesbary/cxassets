"use client";

import { toast } from "sonner";

import { updateImage } from "@/lib/actions/user";
import { UploadButton } from "@/lib/uploadthing";
import { catchError, cn } from "@/lib/utils";
import type { Upload as UType } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLElement> & {
  upload: UType;
};

const Upload = ({ upload, className, ...props }: Props) => {
  async function onComplete(url: string) {
    try {
      await updateImage(url);
      toast.success(upload.complete);
    } catch (error) {
      catchError(error);
    }
  }
  return (
    <section className={cn(className)} {...props}>
      <UploadButton
        appearance={{
          container: "bg-card/15 pt-2",
          allowedContent: "text-primary font-bold",
          button:
            "ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
          // "ut-ready:bg-primary text-primary-foreground hover:bg-primary/90 w-full h-9",
        }}
        content={{
          button({ ready, isUploading }) {
            if (ready) return upload.button.ready;
            if (isUploading) return upload.button.isUploading;
            return upload.button.prep;
          },
          allowedContent({ ready, isUploading }) {
            if (!ready) return upload.allowed.prep;
            if (isUploading) return upload.allowed.isUploading;
            return upload.allowed.ready;
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          // console.log("Files: ", res);
          const url = res[0].url;
          onComplete(url);
        }}
        onUploadError={(error: Error) => {
          catchError(error.message);
        }}
      />
    </section>
  );
};

export { Upload };
