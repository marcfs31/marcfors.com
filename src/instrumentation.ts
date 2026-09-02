import type { Instrumentation } from "next";

export async function register() {
  console.info(
    JSON.stringify({
      type: "boot",
      service: "marcfors.com",
      runtime: process.env.NEXT_RUNTIME ?? "node",
      region: process.env.VERCEL_REGION ?? "local",
    }),
  );
}

export const onRequestError: Instrumentation.onRequestError = (err, request, context) => {
  console.error(
    JSON.stringify({
      type: "request-error",
      message: err instanceof Error ? err.message : String(err),
      digest: (err as { digest?: string }).digest ?? null,
      path: request.path,
      method: request.method,
      routerKind: context.routerKind,
      routePath: context.routePath,
      renderSource: context.renderSource ?? null,
    }),
  );
};
