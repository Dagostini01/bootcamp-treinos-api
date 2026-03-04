import Fastify from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
const app = Fastify({
  logger: true,
});

app.withTypeProvider<ZodTypeProvider>().route({
  method: "GET",
  url: "/",
  schema: {
    response: {
      200: z.object({
        hello: z.string(),
      }),
    },
  },
  handler: () => {
    return { hello: "world" };
  },
});

try {
  await app.listen({ port: Number(process.env.PORT) || 8081 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
