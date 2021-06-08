import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";

const AppRoute: ServerRoute[] = [
  {
    method: "GET",
    path: "/api",
    handler: (_req: Request, h: ResponseToolkit) => {
      return h.response({ greeting: "Welcome to HRRS PORTAL API" });
    },
  },
];

export default AppRoute;
