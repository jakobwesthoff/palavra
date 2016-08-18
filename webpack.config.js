import path from 'path';
import {DefinePlugin} from 'webpack';

export const webpackConfig = {
  entry: {
    'Event': './Application/Event.js',
    'NewTab': './Application/NewTab.js',
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'Distribution', 'Library')
  },

  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules', 'Application']
  },

  node: { fs: 'empty' },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(js)?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'Application'),
        query: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
          ]
        }
      }
    ]
  },
};

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.devtool = 'source-map' ;
}
