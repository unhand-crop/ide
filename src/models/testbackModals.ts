import { createModel } from "hox";
import { useReactive } from "ahooks";

function useTestbackModel() {
  const testbackModals = useReactive<{
    initTestbackVisible: boolean;
  }>({
    initTestbackVisible: false,
  });

  return {
    testbackModals,
  };
}

export default createModel(useTestbackModel);
