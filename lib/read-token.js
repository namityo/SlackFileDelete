var fs = require('fs');

module.exports = {
    read : function(file_name) {
        var home_path = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
        return fs.readFileSync(home_path + '\\' + file_name, 'utf-8');
    }
}
