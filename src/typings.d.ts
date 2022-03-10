declare module "*.scss";

declare interface Window {
  Datafeeds: any;
  api: {
    ipc: any;
    local: any;
    engine: any;
    store: any;
    watch: any;
    path: any;
  };
}
