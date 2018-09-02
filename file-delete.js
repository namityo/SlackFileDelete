const { WebClient } = require('@slack/client');
const moment = require('moment');
const slackFileUtil = require('./lib/slack-file-util');

// トークンの取得
var token = process.env.SLACK_TOKEN;
if (!token) {
    // 環境変数から取得できない場合はユーザーディレクトリから取得
    token = require('./lib/read-token').read('slack.token');
}

// 削除を除外する拡張子を取得
var excludedExtensionsUpperCase = require('./config.json').excludedExtensions.map(v => v.toUpperCase());

// 検索パラメータ
var param = {
    ts_from : moment().subtract(3, 'hour').unix(), // 3時間前までのファイルを取得
}

// ファイルを検索
const web = new WebClient(token);
slackFileUtil.getFileList(web, param, files => {
    // ヒットしたファイルを出力
    files.forEach(c => console.log(c.name + ' ' + c.id + ' ' + moment.unix(c.created).format()));

    // 削除除外する拡張子をチェック
    files.forEach(f => {
        var result = excludedExtensionsUpperCase.indexOf(f.filetype.toUpperCase());
        if (result == -1) {
            // 除外拡張子に見つからない場合は削除対象のため削除
            console.log('delete : ' + f.name + ' [' + f.id + ']');
            slackFileUtil.deleteFile(web, f.id);
        }
    });
});
