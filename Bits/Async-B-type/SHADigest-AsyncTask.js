function validateArmId(armId) {
  // Basic structure check: must follow "module.flow.x"
  const parts = armId.split('.');
  return parts.length === 3 && parts[0] === 'module' && parts[1] === 'flow';
}

fetch('/scripts/mini-intro.json')
  .then(res => res.json())
  .then(config => {
    const { armId, parameters } = config;

    if (!validateArmId(armId)) {
      console.error("❌ Invalid armId format:", armId);
      return;
    }

    const flowModule = armId.split('.')[2];
    System.import(`packages/flowModules/${flowModule}.js`).then(mod => {
      mod.run(parameters);
    }).catch(err => {
      console.error("Failed to import flow module:", err);
    });
  });