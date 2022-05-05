import { useCallback, useEffect } from "react";

import { createModel } from "hox";
import { useReactive } from "ahooks";

const useConsoleModel = () => {
  const model = useReactive({
    outputs: [],
  });

  useEffect(() => {
    if (model.outputs?.length >= 10000) {
      model.outputs = [];
    }
  }, [model.outputs?.length]);

  const log = useCallback((message: string) => {
    console.log(message);
    model.outputs.push(message);
  }, []);

  return {
    model,
    log,
  };
};

export default createModel(useConsoleModel);
