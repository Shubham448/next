console.log(process.env.DB_HOST)
require('dotenv').config();
const webpack = require('webpack');
const bodyParser = require('body-parser');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config;
  },
  api: {
    bodyParser
  },
  env: {
    DB_HOST: process.env.DB_HOST
  }
}
