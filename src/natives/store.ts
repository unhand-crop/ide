import Store from "electron-store";

const store = new Store();

store.set("settings", { name: "test" });

export default store;
