import path from 'path';

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
            'transform-class-properties'
          ]
        }
      }
    ]
  }
};