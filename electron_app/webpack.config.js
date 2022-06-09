module.exports = {
  renderer: {
    entry: './src/renderer/javascripts/index.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/react",
                // '@babel/preset-env',
                ['@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                    },
                  }
                ]
              ]
            }
          }
        },
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: 'babel-loader'
        //     },
        //     {
        //       loader: 'react-svg-loader'
        //     }
        //   ]
        // },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        }
      ]
    }
  },
  preload: {
    entry: './src/preload/index.js'
  },
  main: {
    entry: './src/main/index.js'
  }
}
