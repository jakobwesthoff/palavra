import path from 'path';

export const webpackConfig = {
  entry: {
    'Event': './Application/Event.js',
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'Distribution', 'Library')
  },

  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },

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
          ]
        }
      }
    ]
  }
};