export function exportRegistryJSON() {
  return JSON.stringify(registry, null, 2); // Pretty JSON
}