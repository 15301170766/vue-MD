
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');//解决跨域请求问题中间件

app.use(cors());
app.use(bodyParser());
router.post('/query', ctx => {
	  ctx.body = ctx.request.body
	  console.log(ctx.body)
   ctx.response.body = {data:"buaa"}
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")