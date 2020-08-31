Vue.filter('dateformat', function(value){
    var dat = new Date(value);
    var dtstr = dat.getFullYear() + "/" + (dat.getMonth() + 1) + "/" + dat.getDate() + " " + dat.getHours() + ":" + dat.getMinutes() + ":" + dat.getSeconds();
    return dtstr;
});

var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        articles: []
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        fetch(url + "/posts", {
            method: "GET",
        })
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                }
                // 200番以外のレスポンスはエラーを投げる
                return response.json().then(function(json) {
                    throw new Error(json.message);
                });
            })
            .then(function(json) {
            // レスポンスが200番で返ってきたときの処理はここに記述する
                console.log(json);
                vm.articles = json.posts;
            })
            .catch(function(err) {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
        post: function(){
            fetch(url + "/post", {
                mode: "no-cors",
                method: "POST",
                body: JSON.stringify({
                    "userId": vm.post.userId,
                    "text": vm.post.text,
                    "category": vm.post.category
                })
            })
                .then(function(response) {
                    if (response.status == 200) {
                        return response.json();
                    }
                    // 200番以外のレスポンスはエラーを投げる
                    return response.json().then(function(json) {
                        throw new Error(json.message);
                    });
                })
                .then(function(json) {
                // レスポンスが200番で返ってきたときの処理はここに記述する
                    var content = JSON.stringify(json, null, 2);
                    console.log(content);
                })
                .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        },
        search: function(){
            fetch(url + "/post", {
                mode: "no-cors",
                method: "POST",
                body: JSON.stringify({
                    "userId": vm.post.userId,
                    "text": vm.post.text,
                    "category": vm.post.category
                })
            })
                .then(function(response) {
                    if (response.status == 200) {
                        return response.json();
                    }
                    // 200番以外のレスポンスはエラーを投げる
                    return response.json().then(function(json) {
                        throw new Error(json.message);
                    });
                })
                .then(function(json) {
                // レスポンスが200番で返ってきたときの処理はここに記述する
                    var content = JSON.stringify(json, null, 2);
                    console.log(content);
                })
                .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        }
    },
});
