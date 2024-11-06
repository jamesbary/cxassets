import { CameraIcon } from "lucide-react";
import * as React from "react";

import { Upload } from "@/app/[locale]/(protected)/dashboard/_components/upload-button";
import Camera from "@/components/shared/camera";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {};
const Capture = ({ className, ...props }: Props) => {
  const [capturedImages, setCapturedImages] = React.useState<string[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);

  // console.log({ capturedImages });

  return (
    <section className={cn(className)} {...props}>
      <div className=" space-y-1.5">
        {/* <label
          className="flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          htmlFor="file-upload"
        >
          <UploadIcon className="mr-2 h-5 w-5" />
          Upload Files
          <input
            accept="image/*"
            className="sr-only"
            id="file-upload"
            multiple
            type="file"
          />
        </label> */}
        <Upload />
        <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <CameraIcon className="mr-2 h-5 w-5" />
              Capture
              <span className="sr-only">Capture</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-svh w-svw max-w-full p-0">
            <Camera
              onClosed={() => {
                setShowDialog(false);
              }}
              onCapturedImages={(images) => {
                setCapturedImages(images);
                setShowDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export { Capture };
