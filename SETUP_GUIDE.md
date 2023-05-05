# Custom ChatGPT 開発環境構築ガイド

## 前提条件

* Node.js がインストールされていること
* Git がインストールされていること

## 環境構築手順

1. プロジェクトをクローンする

   ```
   git clone <リポジトリのURL>
   cd custom-chatgpt
   ```

2. 必要な依存関係をインストールする

   ```
   npm install
   ```

3. プロジェクトをビルドする

   ```
   npm run build
   ```

ビルドが完了すると、`dist` ディレクトリが作成され、その中にバンドルされた JavaScript ファイルが生成される

## 開発時のコマンド

* `build.ps1` を実行することで、以下のコマンドを実行される
  * プロジェクトのビルド: `npm run build`
    * プロジェクトをビルドして、バンドルされた JavaScript ファイルを生成
  * Chrome に読み込ませるためのファイルを生成: `python zip.py`
    * `temp_dir` ディレクトリに必要なファイルのみをコピー
    * `extension.zip` ファイルを生成
* `temp_dir` ディレクトリを「パッケージ化されていない拡張機能を読み込む」で選択
* パッケージアップロードの際は、`extension.zip` をアップロード
