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
