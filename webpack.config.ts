// import { Configuration } from "webpack";
// const commonConfig = require('./webpack1.common.ts');
// const devConfig = require('./webpack1.dev.ts');
// const prodConfig = require('./webpack1.prod.ts');

// const webpackConfig = (env, argv): Configuration => ({
//   ...commonConfig,
//   ...(argv.mode === 'development'
//     ? devConfig
//     : prodConfig),
// });

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.ts');
const devConfig = require('./webpack.dev.ts');
const prodConfig = require('./webpack.prod.ts');

const webpackConfig = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}

export default webpackConfig;
