import { register as registerPython } from "./python";

export const registerLanguages = async () => {
  await registerPython();
};
