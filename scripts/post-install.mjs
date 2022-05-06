import { factory } from "nerdctl";

async function main() {
  const vm = factory();

  await vm.downloadVM();
  await vm.downloadVMImages();
}

main();
