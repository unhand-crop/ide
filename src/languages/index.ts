import { GetApiTreeMethodsInfoOutPut } from "@/services/apiTree";
import { register as registerUnhandPython } from "./unhand-python";

export const registerLanguages = async (
  data: GetApiTreeMethodsInfoOutPut[]
) => {
  await registerUnhandPython(data);
};
