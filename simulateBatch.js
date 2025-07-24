import { embedDigest, debedDigest } from "./digestRegistry.js";

const simulatedBatch = [
  { transactionId: "txn001", payload: "payment to Alice", armId: "module.flow.dispatch" },
  { transactionId: "txn002", payload: "refund to Bob", armId: "module.flow.intake" },
  { transactionId: "txn003", payload: "cert update", armId: "module.flow.archive" }
];

export async function runBatch() {
  for (const item of simulatedBatch) {
    await embedDigest(item);
  }

  // Optional verification step
  debedDigest("txn002");
}