import "server-only";

import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";
import { cache } from "react";

export const getCachedSession = cache(async () => {
  noStore();
  try {
    return await auth();
  } catch (err) {
    console.error(err);
    return null;
  }
});
