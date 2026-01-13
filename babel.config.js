module.exports = function (api) {
  api.cache(true);
  
  const presets = ['babel-preset-expo'];
  const plugins = [];

  // Adicionar plugin dotenv apenas se não estiver em ambiente de teste
  if (process.env.NODE_ENV !== 'test') {
    plugins.push([
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: false,
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};