import { useReactive } from "ahooks";
import { createModel } from "hox";

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
