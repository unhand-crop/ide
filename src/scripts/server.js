const http = require("http");

const ENGINE_EVENT_INIT_SERVER_FINISH = "engine-event-init-server-finish";
const ENGINE_EVENT_INIT_SERVER_MESSAGE = "engine-event-init-server-message";
const ENGINE_EVENT_INIT_SERVER_ERROR = "engine-event-init-server-error";

const hostname = "0.0.0.0";
const port = process.argv[2];

try {
  const server = http.createServer((req, res) => {
    if (req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        process.send({
          type: ENGINE_EVENT_INIT_SERVER_MESSAGE,
          data,
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end({ success: true, message: "OK" });
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end({ success: true, message: "OK" });
    }
  });

  server.setTimeout(0);

  server.on("close", () => {
    process.send({
      type: ENGINE_EVENT_INIT_SERVER_ERROR,
      data: "server close",
    });
  });

  server.on("error", (error) => {
    process.send({
      type: ENGINE_EVENT_INIT_SERVER_ERROR,
      data: JSON.stringify(error),
    });
  });

  server.listen(port, hostname, () => {
    process.send(`Server running at http://${hostname}:${port}/`);
    process.send({
      type: ENGINE_EVENT_INIT_SERVER_FINISH,
    });
  });
} catch (err) {
  process.send({
    type: ENGINE_EVENT_INIT_SERVER_ERROR,
    data: JSON.stringify(error),
  });
}

// const Fastify = require("fastify");

// const fastify = Fastify({
//   logger: false,
// });

// fastify.get("/", (request, reply) => {
//   reply.send({ success: true, message: "OK" });
// });

// fastify.post("/", (request, reply) => {
//   process.send(request.body);
//   reply.send({ success: true, message: "OK" });
// });

// fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
//   if (err) {
//     process.send({
//       type: ENGINE_EVENT_INIT_SERVER_ERROR,
//       data: JSON.stringify(err),
//     });
//     throw err;
//   }
//   process.send({
//     type: ENGINE_EVENT_INIT_SERVER_FINISH,
//   });
// });
