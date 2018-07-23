const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
var cors = require('koa-cors');//解决跨域请求问题中间件
app.use(cors());


router.get('/ddd', ctx => {
	  ctx.response.type = 'application/json';
  console.log(ctx.response.sex);
  let res;
  if(ctx.query.sex == "女"){
  	res = "嘻嘻嘻"
  }
  
  
  
  ctx.response.body = {data:res}
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")
