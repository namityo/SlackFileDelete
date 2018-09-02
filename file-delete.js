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
    ts_from : moment().subtract(
        require('./config.json').param.from.value,
        require('./config.json').param.from.type
    ).unix(),
}

// ファイルを検索
const web = new WebClient(token);
slackFileUtil.getFileList(web, param, files => {
    // ヒットしたファイルを出力
    console.log("------ Files uploaded after [" + moment.unix(param.ts_from).format() + "] ------")
    files.forEach(c => console.log(c.name + ' ' + c.id + ' ' + moment.unix(c.created).format()));

    // 削除除外する拡張子をチェック
    console.log("------ Delete files ------")
    files.forEach(f => {
        var result = excludedExtensionsUpperCase.indexOf(f.filetype.toUpperCase());
        if (result == -1) {
            // 除外拡張子に見つからない場合は削除対象のため削除
            console.log(f.name + ' [' + f.id + ']');
            slackFileUtil.deleteFile(web, f.id);
        }
    });
});
