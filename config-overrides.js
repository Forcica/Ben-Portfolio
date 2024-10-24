module.exports = function override(config, env) {
   config.module.rules = config.module.rules.filter(
      (rule) => !rule.loader || !rule.loader.includes('source-map-loader')
   );
   return config;
};
 