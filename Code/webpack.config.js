const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './main-ui.tsx',
    code: './simple-code.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript - All UI files
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /src-code/],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
            transpileOnly: true // Skip type checking for faster builds
          }
        }
      },
      
      // Converts TypeScript code to JavaScript - Code files  
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src-code'),
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'src-code/tsconfig.json',
            transpileOnly: true // Ignore type errors for Figma API
          }
        }
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // Allows you to use SVG files
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { 
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      // Provide React as a global for UMD-style files
      'React': 'react'
    }
  },

  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'code'
        ? 'code.js'
        : '[name].[contenthash].js';
    },
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    // Clean the output directory before emit.
    clean: true,
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
    new webpack.ProvidePlugin({
      React: 'react', // Automatically provide React to all modules
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html',
      filename: 'ui.html',
      chunks: ['ui'],
    }),
    new HtmlInlineScriptPlugin({
      htmlMatchPattern: [/ui.html/],
      scriptMatchPattern: [/.js$/],
    }),
  ],
});