import { runBatch } from "packages/flowModules/simulateBatch.js";

runBatch().then(() => {
  console.log("🎯 Simulated batch completed.");
});