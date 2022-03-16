import * as path from "path";

import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { Logger, runner } from "hygen";

import Docker from "dockerode";
import { store } from "./store";

class Engine {
  private readonly docker: Docker;

  constructor(
    private readonly dockerOptions: Docker.DockerOptions,
    private readonly templates?: string,
    private readonly image: string = "unhand/unhand:latest"
  ) {
    this.docker = new Docker(this.dockerOptions);
    if (!templates) {
      this.templates = path.join(__dirname, "_templates");
    }
  }

  async create(path: string, language: "python" | "csharp" = "python") {
    runner([language, "new", path], {
      templates: this.templates,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      debug: !!process.env.DEBUG,
      exec: (action, body) => {
        const opts =
          body && body.length > 0
            ? {
                input: body,
              }
            : {};
        return require("execa").shell(action, opts);
      },
      createPrompter: () => require("enquirer"),
    });
  }

  async backtest(
    containerCreateOptions: Docker.ContainerCreateOptions = {},
    outputListener?: (stream: NodeJS.ReadWriteStream) => void
  ): Promise<any> {
    await this.pull();
    return await this.run(containerCreateOptions, outputListener);
  }

  async run(
    containerCreateOptions: Docker.ContainerCreateOptions = {},
    outputListener?: (stream: NodeJS.ReadWriteStream) => void
  ) {
    const engineContainer: Docker.Container = await this.docker.createContainer(
      {
        Image: this.image,
        Tty: true,
        ...containerCreateOptions,
      }
    );

    engineContainer.attach(
      { stream: true, stdout: true, stderr: true },
      (err, stream) => {
        if (err) {
          throw new Error(err);
        }
        if (stream) {
          outputListener && outputListener(stream);
        }
      }
    );

    await engineContainer.start();

    return await engineContainer.wait();
  }

  async pull() {
    const imageIndex = (await this.docker.listImages()).findIndex(
      (img) => img.RepoTags[0] === this.image
    );

    if (imageIndex >= 0) {
      return true;
    }

    return new Promise((resolve, reject) => {
      this.docker.pull(this.image, {}, (err, stream) => {
        if (err) {
          reject(err);
        }
        stream?.pipe(process.stdout);

        this.docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished() {
          resolve(true);
        }
        function onProgress(event: any) {
          console.log(event.status);
        }
      });
    });
  }
}

const engine = new Engine({ socketPath: "/var/run/docker.sock" });

// engine.pull();

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.create", async (_, args) => {
    const path = args[0];
    const language = args[1] ?? "python";
    await engine.create(path, language);
  });
  ipcMain.handle("engine.backtest", async (_, args) => {
    const port = await store.get("server-port");
    const exitInfo = await engine.backtest(
      {
        HostConfig: {
          AutoRemove: true,
          Binds: [`${args[0]}:/app/custom/algorithm`],
        },
        // LOADREMOTE：是否加载远程engine数据
        Env: [`LOADREMOTE=true`, `DOMAIN=http://host.docker.internal:${port}/`],
      },
      (stream) => {
        stream.on("start", () => {
          mainWindow.webContents.send("engine-stream-start");
        });
        stream.on("end", () => {
          mainWindow.webContents.send("engine-stream-end");
        });
        stream.on("error", () => {
          mainWindow.webContents.send("engine-stream-error");
        });
        stream.on("finish", () => {
          mainWindow.webContents.send("engine-stream-finish");
        });
        stream.on("data", (data) => {
          if (data) {
            mainWindow.webContents.send(
              "engine-stream-data",
              Buffer.from(data).toString("utf-8")
            );
          }
        });
      }
    );
    return exitInfo;
  });
};

export const registerEngineInvokes = () => {
  return {
    async create(...args: any[]) {
      return await ipcRenderer.invoke("engine.create", args);
    },
    async backtest(...args: any[]) {
      return await ipcRenderer.invoke("engine.backtest", args);
    },
  };
};
