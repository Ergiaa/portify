import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!context.cookies.has("auth_token")) {
      return context.redirect("/admin/login");
    }
  }
  return next();
});
