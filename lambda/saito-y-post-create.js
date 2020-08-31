var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "post";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    var body = JSON.parse(event.body);

    var userId = body.userId;
    var text = body.text;
    var category = body.category;
    var timestamp = Date.now();

    if(!userId){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "userIdを入力してください"});
        callback(null, response);
        return;
    }

    if(!text){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "textを入力してください"});
        callback(null, response);
        return;
    }

    //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    var param = {
        "TableName" : tableName,
        "Item" : {
            "userId" : userId,
            "text" : text,
            "category" : category,
            "timestamp" : timestamp
        }
    };

    //dynamo.put()でDBにデータを登録
    dynamo.put(param, function(err, data) {
        if (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "DynamoDB Error",
                "detail": err
            });
            callback(null, response);
            return;
        } else {
            //TODO: 登録に成功した場合の処理を記述
            response.body = JSON.stringify(param.Item);
            callback(null, response);
            return;
        }
    });
};
