fetch('/scripts/mini-intro.json')
  .then(res => res.json())
  .then(config => {
    const armId = config.armId; // "module.flow.dispatch"

    // Parse armId to locate target module
    const parts = armId.split('.');
    const moduleName = parts[2]; // "dispatch"

    // Dynamically load from flowModules
    System.import(`flowModules/${moduleName}.js`).then(module => {
      module.run(config.parameters);
    });
  });