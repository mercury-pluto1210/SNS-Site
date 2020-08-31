var fs = require('fs');

let username = "username";
let dir = "./lambda";

// get files
fs.readdir(dir, function (err, files) {
    if (!isValidUsername()){
        console.log("変数usernameの値を適切なものに変更してください");
        return;
    }
    if (err) throw err;
    // iterate files
    files.forEach(function (file) {
        if (file.match(/username/)) {
            // create path
            var fileArray = file.split("-");
            fileArray[0] = username
            let old_filepath = `${dir}/${file}`;
            let new_filepath = `${dir}/${fileArray.join("-")}`;
            // filename convert
            fs.rename(old_filepath, new_filepath, function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                else {
                    console.log(old_filepath, new_filepath, 'finished!!');
                }
            });
        }
    })
});

function isValidUsername(){
    if (username === "username" ) {
        return false;
    }
    return true;
}
