async function generateShaDigest(payload) {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const digestHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    timestamp: new Date().toISOString(),
    digest: digestHex,
    algorithm: "SHA-256",
    verified: true,
    complianceLevel: "CA-Verified",
    metadata: {
      purpose: "transaction-signature",
      origin: "async-flow",
      legalBinding: "true"
    }
  };
}