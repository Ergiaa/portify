import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { AppRouterClient } from "@portify/api/routers/index";
import { PUBLIC_SERVER_URL } from "astro:env/client";

function getToken(): string {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1] ?? ""
  );
}

const link = new RPCLink({
  url: `${PUBLIC_SERVER_URL}/rpc`,
  headers: () => ({ Authorization: `Bearer ${getToken()}` }),
});

export const adminOrpc: AppRouterClient = createORPCClient(link);
