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

    //TODO: paramに更新対象のテーブル名と更新内容を記述
    var param = {
    };

    //dynamo.put()を用いてデータの更新
    dynamo.put(param, function(err, data){
        if(err){
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "DynamoDB Error",
                "detail": err
            });
            callback(null, response);
            return;
        }else{
            //TODO: 更新に成功した場合の処理を記述
        }
    });
};
