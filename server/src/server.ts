import fastify from "fastify";
import cors from "@fastify/cors";
import { AppRoutes } from "./lib/routes";

const app = fastify();

app.register(cors);
app.register(AppRoutes);

app
  .listen({
    port: 5151,
    host: "0.0.0.0"
  })
  .then(() => {
    console.log("server running at port 5151");
  });
