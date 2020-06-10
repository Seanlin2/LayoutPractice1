//在此設定 IP 為 192.168.56.100，開啟 8080 port
var server = require('http').createServer(handler),
           ip = "192.168.56.100",
           port = 8080,
           url = require('url'),
           fs = require('fs'),
           si = require('socket.io');

server.listen(port, ip);

//啟動網頁時所執行的函式
function handler(req, res) {
           //讀取 index.html 網頁
           fs.readFile('./index.html', function(err, data) {
                     //若讀取錯誤，就回傳 http 代碼為 500 的訊息（Internal Server Error）
                     if (err) {
                                res.writeHead(500);
                                return res.end('Error loading index.html');
                     }
                    
                     //若無任何錯誤，即回傳 http 代碼 200（OK, The request has succeeded）
                     res.writeHead(200);
                     res.end(data);
           });
}

　

var io = si.listen(server);

io.sockets.on('connection', function(socket)
{
           //剛進入聊天室的連線回傳
           socket.on('check_login', function(username) {
                     //自己上線(創造隨機 ID 給前端，讓自己的人物可以被程式辨識)
                     var numID = Math.random();
                     numID = numID.toString();
                     numID = numID.replace(".", "");
                    
                     socket.username = username;
                     socket.userid = numID;
                    
                     //新增自己的角色
                     socket.emit('add_new_user_myself', {
                                new_user_id: numID,
                                new_user_name: username
                     });
                    
                     //告訴別人自己上線
                     socket.broadcast.emit('add_new_user', {
                                new_user_id: numID,
                                new_user_name: username
                     });
           });
          
           //你的移動位置
           socket.on('other_user_position', function(data){
                     //告訴別人你的位置
                     socket.broadcast.emit('feedback_user_position', {
                                otherID: data.id,
                                left: data.left,
                                top: data.top,
                                imgV: data.imgV
                     });
           });
          
           //告訴新上線的人，我在哪裡
           socket.on('feedback_other_exist', function(data){
                     //告訴別人你的位置
                     socket.broadcast.emit('feedback_where_I_am', {
                                id: data.id,
                                name: data.name,
                                new_user_id: data.new_user_id
                     });
           });
          
           // 回傳前端所丟之訊息
           socket.on('send_msg', function(data) {
                     //自己說了什麼
                     socket.emit('return_msg', {
                                id: data.id,
                                name: data.name,
                                msg: data.msg,
                                time: getTodayDate()
                     });
                    
                     //告訴別人我說了什麼
                     socket.broadcast.emit('return_msg', {
                                id: data.id,
                                name: data.name,
                                msg: data.msg,
                                time: getTodayDate()
                     });
           });
          
           //離開聊天室
           socket.on('disconnect', function() {
                     socket.broadcast.emit('leave_msg', {
                                id: socket.userid,
                                name: socket.username
                     });     
           });
});

//在伺服器的 command line 畫面，秀出相關訊息
console.log("Server running at http://" + ip + ":" + port + "/");

　

//取得今天的日期（ISO 8601），讓使用者送出訊息時參考用
function getTodayDate() {
           var str = '';

           // 宣告日期物件
           var today = new Date();

           // 年
           var today_year = today.getFullYear();
           str += today_year;

           // 月
           var today_month = today.getMonth() + 1;
           if (today_month >= 10)
                     str += '-' + today_month;
           else
                     str += '-0' + today_month;

           // 日
           var today_date = today.getDate();
           if (today_date >= 10)
                     str += '-' + today_date;
           else
                     str += '-0' + today_date;

           var today_hour = today.getHours();
           if (today_hour >= 10)
                     str += ' ' + today_hour;
           else
                     str += ' 0' + today_hour;

           var today_minute = today.getMinutes();
           if (today_minute >= 10)
                     str += ':' + today_minute;
           else
                     str += ':0' + today_minute;

           var today_second = today.getSeconds();
           if (today_second >= 10)
                     str += ':' + today_second;
           else
                     str += ':0' + today_second;

           return str;
}
