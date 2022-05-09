const http = require("http");

const ENGINE_EVENT_INIT_SERVER_FINISH = "engine-event-init-server-finish";
const ENGINE_EVENT_INIT_SERVER_MESSAGE = "engine-event-init-server-message";
const ENGINE_EVENT_INIT_SERVER_ERROR = "engine-event-init-server-error";

const hostname = "0.0.0.0";
const port = process.argv[2] ?? 9999;

try {
  http
    .createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const response = JSON.stringify({ success: true, message: "OK" });

      if (req.method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          process.send({
            event: ENGINE_EVENT_INIT_SERVER_MESSAGE,
            data,
          });
          console.log(data);
          res.end(response);
        });
      } else {
        res.end(response);
      }
    })
    .on("error", (error) => {
      process.send({
        event: ENGINE_EVENT_INIT_SERVER_ERROR,
        data: JSON.stringify(error),
      });
      console.error(error);
    })
    .listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
      process.send({
        event: ENGINE_EVENT_INIT_SERVER_FINISH,
      });
    });
} catch (err) {
  console.error(err);
}
