import { GetApiTreeMethodsInfoOutPut } from "@/services/api-tree";
import { register as registerPython } from "./python";

export const registerLanguages = async (
  data: GetApiTreeMethodsInfoOutPut[]
) => {
  await registerPython(data);
};
