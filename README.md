# Slack File Delete

Slack上のファイルを削除するスクリプトです。

## 実行方法

トークンを `SLACK_TOKEN` 環境変数または、`~/slack.token` ファイルに格納してください。

```
npm run start
```

でスクリプトが動作します。

## 設定

`config.json` で以下の設定を変更できます。

 * 削除除外拡張子(初期は `jpg`、`jpeg`、`gif`、`png`)
 * 検索開始日時(初期は3時間前以降)
