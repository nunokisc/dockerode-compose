module.exports = async function (docker, projectName, recipe) {
  var configs = [];
  var configNames = Object.keys(recipe.configs || []);
  for (var configName of configNames) {
    var config = recipe.configs[configName];
    if (config.external === true) continue;
    var opts = {
      'Name': projectName + '_' + configName,
      'Data': fs.readFileSync(config.file, 'utf8')
    };
    if (config.name !== undefined) {
      opts.Name = configName;
    }
    try {
      configs.push(await docker.createConfig(opts));
    } catch (err) {
      throw err;
    }
  }
  return configs;
}