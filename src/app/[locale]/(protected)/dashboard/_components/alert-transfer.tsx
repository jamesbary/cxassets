import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { NotEnough } from "@/types/dash";

const AlertTransfer = ({ data }: { data: NotEnough & { btn: string } }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant={"outline"} size={"sm"} className="w-full">
        {data.btn}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{data.title}</AlertDialogTitle>
        <AlertDialogDescription>{data.desc}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{data.cancel}</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export { AlertTransfer };
