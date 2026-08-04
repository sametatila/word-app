import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const handlers = auth?.handler();
const disabled = () =>
  new Response(JSON.stringify({ error: "auth_disabled" }), {
    status: 404,
    headers: { "content-type": "application/json" },
  });

export const GET = handlers?.GET ?? disabled;
export const POST = handlers?.POST ?? disabled;
