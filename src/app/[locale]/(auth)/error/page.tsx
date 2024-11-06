"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

enum Error {
  Configuration = "Configuration",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      Authenticate Error. Please contact us if this persists. Unique error code:{" "}
      <code className="text-xs p-1 rounded-sm">Configuration</code>
    </p>
  ),
};

function ErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <a
        href="#"
        className="block max-w-sm p-6 border border-border rounded-md shadow hover:border/75 text-center"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight flex flex-row justify-center items-center gap-2">
          Something went wrong
        </h5>
        <div className="font-normal">
          {errorMap[error] || "Please contact us if this error persists."}
        </div>
      </a>
      <div></div>
    </div>
  );
}
export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorPage />
    </Suspense>
  );
}
