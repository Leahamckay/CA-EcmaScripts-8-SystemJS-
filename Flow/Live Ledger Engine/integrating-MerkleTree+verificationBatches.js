export function generateMerkleRoot() {
  const hashes = registry.map(entry => entry.digest);
  while (hashes.length > 1) {
    if (hashes.length % 2 !== 0) hashes.push(hashes[hashes.length - 1]);
    hashes = hashes.reduce((acc, _, i, arr) => {
      if (i % 2 === 0) acc.push(SHA256(arr[i] + arr[i + 1]));
      return acc;
    }, []);
  }
  return hashes[0]; // Merkle Root
}