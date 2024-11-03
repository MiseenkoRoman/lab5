const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Режим: development або production
  entry: './src/index.js', // Вхідна точка
  output: {
    filename: 'bundle.js', // Ім'я вихідного файлу
    path: path.resolve(__dirname, 'dist'), // Директорія для збереження
    clean: true, // Очищення директорії dist перед новою збіркою
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Обробка SCSS-файлів
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
          'css-loader',               // Загружает CSS
          'sass-loader'               // Компилирует SCSS в CSS
        ]
      },
      {
        test: /\.css$/, // Обробка CSS-файлів
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/, // Обробка JavaScript-файлів
        exclude: /node_modules/,
        use: 'babel-loader' // Використання Babel для JS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Обробка зображень
        type: 'asset/resource', // Автоматичне управління ресурсами
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML
      filename: 'index.html' // Ім'я вихідного файлу HTML
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'dist/assets/images' } // Копіювання зображень
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' // Ім'я вихідного CSS файлу
    })
  ],
  devServer: {
    contentBase: './dist', // Директорія для сервера
    hot: true, // Включення гарячого перезавантаження
  }
};
