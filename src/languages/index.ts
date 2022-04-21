import { GetApiTreeMethodsInfoOutPut } from "@/services/apiTree";
import { register as registerPython } from "./python";

export const registerLanguages = async (
  data: GetApiTreeMethodsInfoOutPut[]
) => {
  await registerPython(data);
};
