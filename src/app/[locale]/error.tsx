"use client";

import { useEffect } from "react";
import { reportClientError } from "@/lib/errors";
import { SITE_NAME } from "@/lib/site";

// English-only, like `app/global-error.tsx` and `app/not-found.tsx`: an error
// boundary sits in the tree for every route, so importing the six-locale `copy`
// map here would ship all of it to every page. The three strings below are the
// English values of `errorTitle` / `errorBody` / `retryCta`.
export default function ErrorView({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError(error, "client-boundary");
  }, [error]);

  return (
    <div className="wrap">
      <p className="kicker">{SITE_NAME}</p>
      <h1>The line dropped</h1>
      <p className="lede">
        Something failed while this desk was drawing itself. Retry, or write to me if it stays down.
      </p>
      <button type="button" className="cta" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
