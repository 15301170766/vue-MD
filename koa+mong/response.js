const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
var cors = require('koa-cors');//解决跨域请求问题中间件
app.use(cors());


router.get('/query', ctx => {
  console.log(ctx.query);
  console.log(ctx.querystring);
  ctx.body = '你得到了我'
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")