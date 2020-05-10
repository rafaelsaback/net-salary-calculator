module.exports = function babelConfig(api) {
  api.cache.forever();
  return {
    babelrcRoots: [
      // Keep the root as a root
      '.',
      // Also consider monorepo packages "root" and load their .babelrc.json files.
      './packages/*',
    ],
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
