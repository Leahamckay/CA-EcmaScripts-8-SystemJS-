// packages/flowModules/intake.js
import { generateSignature } from './signature.js';

export async function run(params) {
  console.log("📥 Intake flow started...");
  const sig = await generateSignature(params.payload || 'default-intake');
  console.log(`Signature (Line-In): ${sig}`);
}