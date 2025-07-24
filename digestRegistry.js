const registry = [];

export function embedDigest({ transactionId, payload, armId }) {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  return crypto.subtle.digest("SHA-256", data).then(buffer => {
    const hex = Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    const entry = {
      timestamp: new Date().toISOString(),
      transactionId,
      digest: hex,
      armId,
      metadata: {
        certified: true,
        origin: "flowModules",
        legalBinding: true
      }
    };

    registry.push(entry);
    console.log("✅ Digest embedded:", entry);
    return entry;
  });
}

export function debedDigest(transactionId) {
  const found = registry.find(entry => entry.transactionId === transactionId);
  if (!found) {
    console.error("❌ Digest not found for transaction:", transactionId);
    return null;
  }
  console.log("🔍 Digest debedded:", found);
  return found;
}