var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "post";

exports.handler = (event, context, callback) => {
    //レスポンスの雛形
    var response = {
        statusCode : 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    var userId = event.queryStringParameters.userId;   //見たいユーザのuserId
    var start = event.queryStringParameters.start;
    var end = event.queryStringParameters.end;
    var category = event.queryStringParameters.category;

    if(!userId){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "userIdを指定してください"});
        callback(null, response);
        return;
    }

    if((start && !end) || (!start && end)){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "startまたはendを指定してください"});
        callback(null, response);
        return;
    }

    //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
    var param = {
        "TableName" : tableName,
        "Key" : {
            "userId" : userId,
            "start" : start,
            "end" : end,
            "category" : category
        }
    };

    //dynamo.get()でDBからデータを取得
    dynamo.get(param, function(err, data){
        if(err){
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "DynamoDB Error",
                "detail": err
            });
            callback(null, response);
            return;
        }
        //TODO: レスポンスボディの設定とコールバックを記述
        response.body = JSON.stringify(data.Item);
        callback(null, response);

    });
};
