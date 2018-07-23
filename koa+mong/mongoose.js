
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
//const Monk = require('monk');//链接md中间件
var mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');//解决跨域请求问题中间件

app.use(cors());
app.use(bodyParser());
var db = mongoose.connect('localhost:27017/test');//链接到库
//如果连接成功会执行error回调
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
//如果连接成功会执行open回调
db.connection.on("open", function () {
    console.log("数据库连接成功");
});


//app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")
