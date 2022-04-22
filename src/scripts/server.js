const Fastify = require("fastify");

const port = process.argv[2];

const fastify = Fastify({
  logger: true,
});

fastify.get("/", (request, reply) => {
  reply.send({ success: true, message: "OK" });
});

fastify.post("/", (request, reply) => {
  process.send(request.body);
  reply.send({ success: true, message: "OK" });
});

fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
});
