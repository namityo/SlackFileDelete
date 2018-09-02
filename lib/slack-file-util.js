module.exports = {
    deleteFile : function(web, id) {
        param = {file : id}
        web.files.delete(param).then((res) => {
            // 完了
        }).catch(console.errro);
    },

    getFileList : function(web, param, callback) {
        // パラメータの作成(pageは再帰呼び出しで加算するため変数を作成しておく)
        param = Object.assign({page : 1}, param)
        // 再帰呼び出しで全ファイルの情報を取得する
        getFileListInner(web, param, [], callback);
    }
}

/**
 * ファイル一覧を取得するメソッド（内部）
 * @param {*} web 
 * @param {*} param 
 * @param {*} files 
 * @param {*} callback 
 */
function getFileListInner(web, param, files, callback) {
    web.files.list(param).then((res) => {
        if (res.files.length > 0) {
            // 次のページをチェック
            param.page = param.page + 1;
            getFileListInner(web, param, files.concat(res.files), callback);
        } else {
            // 終わり
            callback(files);
        }
    }).catch(console.error);
}