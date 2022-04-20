import { register as registerUnhandPython } from "./unhand-python";

export const registerLanguages = async () => {
  await registerUnhandPython();
};
