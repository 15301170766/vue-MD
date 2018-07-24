const mongoose = require('mongoose');//引用库、、简书地址https://www.jianshu.com/p/8af0552831f6
mongoose.connect('mongodb://localhost:27017/demo');//连接地址
var db = mongoose.connection;//定义连接
db.on('error', console.error.bind(console, '数据库连接失败'));
db.once('open', function() {
  // we're connected!
  console.log(`数据库连接成功!`)
});
db.on('disconnected', function () {    
    console.log('连接断开');  
});

module.exports = mongoose;