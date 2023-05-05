# 環境構築の記録

ファイル分割にあたり必要となったモジュールバンドラとトランスパイラの導入について

## プロジェクト構成

- `content.js` : コンテンツスクリプト。ウェブページ上で実行される JavaScript
- `styles.css` : コンテンツスクリプトで使用するスタイルシート
- `popup.html` & `popup.js` : ブラウザアクションのポップアップ用 HTML と JavaScript
- `manifest.json` : Chrome 拡張機能の設定ファイル
- `icon/` : 拡張機能のアイコン画像
- `domUtils.js`, `chatHistoryTitle.js`, `toggleSidebar.js` : カスタム機能のための JavaScript モジュール
- `package.json` : プロジェクトの依存関係やスクリプトを管理するファイル
- `webpack.config.js` : Webpack の設定ファイル

## モジュールバンドラとトランスパイラの導入

- Webpack を導入し、モジュールバンドラとして使用
- Babel を導入し、トランスパイラとして使用
- ES6 モジュールを使用するために、`type="module"` を使用していた箇所を削除
- Chrome 拡張機能の `manifest.json` の `content_scripts` セクションに、バンドルされたファイルを指定

## 依存関係のインストール

プロジェクトに必要な依存関係をインストールする前に、`npm init` コマンドを実行して `package.json` ファイルを作成

その後、以下のコマンドを実行して、必要な依存関係をインストール

```
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env --save-dev
```

上記のコマンドで、プロジェクトに Babel および Webpack 関連の依存関係がインストールされる

## Webpack の設定

`webpack.config.js` ファイルを作成し、以下の内容で設定

```javascript
const path = require('path');

module.exports = {
  entry: './content.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
```

## ビルドスクリプトの追加

`package.json` ファイルの `scripts` セクションに、以下のビルドスクリプトを追加

```
"scripts": {
  "build": "webpack"
}
```

これにより、`npm run build` コマンドを実行することで、プロジェクトをビルドできるようになる
