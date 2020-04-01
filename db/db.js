var mysql=require('mysql');
function Connection(){
    var client=mysql.createConnection({
        host:'127.0.0.1',//127.0.0.1 182.92.126.18 182.92.126.18
        user:'root',
        password:'HQJ719676340',
        database:'safe',
    })
    return client;
}
exports.Connection=Connection;