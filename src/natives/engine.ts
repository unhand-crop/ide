import * as path from "path";

import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { Logger, runner } from "hygen";

// import { ChildProcess } from "child_process";
import Docker from "dockerode";
import VmEnv from "@unhand/vmenv";
import { status as getWslStatus } from "node-wsl";
import { isWindows } from "./utils";
import { store } from "./store";

const CONTAINER_NAME = "nerdctl";
const ENGINE_IMAGE = "unhand/unhand:latest";
const vmenv = new VmEnv();
class Engine {
  private readonly docker: Docker;
  engineContainer: any;

  constructor(
    private readonly dockerOptions: Docker.DockerOptions,
    private readonly templates?: string,
    private readonly image: string = ENGINE_IMAGE
  ) {
    this.docker = new Docker(this.dockerOptions);
    this.engineContainer = null;
    if (!templates) {
      this.templates = path.join(__dirname, "_templates");
    }
  }

  async init() {
    if (isWindows) {
      const status = await getWslStatus();
      console.log(status);
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
    const container: Docker.Container = await this.docker.createContainer({
      Image: this.image,
      Tty: true,
      ...containerCreateOptions,
    });
    container.attach(
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
    await container.start();
    this.engineContainer = container;
    const wait = await container.wait();
    return wait;
  }

  async stop() {
    try {
      return await this.engineContainer?.stop();
    } catch (e) {}
  }

  async remove() {
    try {
      return await this.engineContainer?.remove();
    } catch (e) {}
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

const engine = new Engine({
  socketPath: isWindows ? "//./pipe/docker_engine" : "/var/run/docker.sock",
});

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.init", async () => {
    await engine.init();
  });
  ipcMain.handle("engine.create", async (_, args) => {
    const path = args[0];
    const language = args[1] ?? "python";
    await engine.create(path, language);
  });
  ipcMain.handle("engine.backtest", async (_, args) => {
    const port = await store.get("server-port");
    // const child = vmenv.run(
    //   `${CONTAINER_NAME} run ${ENGINE_IMAGE} --rm -v ${args[0]}:/app/custom/algorithm -e LOADREMOTE=true -e DOMAIN=http://host.docker.internal:${port}/`,
    //   "",
    //   {
    //     async: true,
    //   }
    // ) as ChildProcess;

    // child.stdout.on("data", (data) => {
    //   console.log("=>", data);
    // });

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
  ipcMain.handle("engine.stop", async (_, args) => {
    return await engine.stop();
  });
  ipcMain.handle("engine.remove", async (_, args) => {
    return await engine.remove();
  });
};

export const registerEngineInvokes = () => {
  return {
    async init(...args: any[]) {
      return await ipcRenderer.invoke("engine.init", args);
    },
    async create(...args: any[]) {
      return await ipcRenderer.invoke("engine.create", args);
    },
    async backtest(...args: any[]) {
      return await ipcRenderer.invoke("engine.backtest", args);
    },
    async stop(...args: any[]) {
      return await ipcRenderer.invoke("engine.stop", args);
    },
    async remove(...args: any[]) {
      return await ipcRenderer.invoke("engine.remove", args);
    },
  };
};
