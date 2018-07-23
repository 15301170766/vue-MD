
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const Monk = require('monk');//链接md中间件
const bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');//解决跨域请求问题中间件

app.use(cors());
app.use(bodyParser());
const db = new Monk('localhost:27017/test');//链接到库
const students = db.get("orgnize");//链接到表

//查询所有数据
router.get('/ddd', async ( ctx ) => {
  ctx.response.type = 'text/html';
  console.log(ctx.query.TableId)
  ctx.body = ctx.request.body
	  console.log(ctx)

  	ctx.response.body = await students.find()
});
//GetModel
router.post('/GetModel', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
//	  查询数据库
	  let GetModel = await students.find({"_id":ctx.body.TableId})
	  console.log(ctx.body.TableId)
   	ctx.response.body = GetModel
})
//编辑
router.post('/Edit', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
	  console.log(ctx.body)
//	  查询数据库
	  await students.update({"_id":ctx.body.TableId},{"$set":{"text":ctx.body.Name,"parent":ctx.body.parent}})
	  //console.log(ctx.body.TableId)
	  //console.log(ctx.query.TableId)
   	ctx.response.body = "success"
})
//新增
router.post('/Add', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
	  console.log(ctx.body)
//	  查询数据库
	  await students.insert({"text":ctx.body.Name,"parent":ctx.body.parent})
	  //console.log(ctx.body.TableId)
	  //console.log(ctx.query.TableId)
   	ctx.response.body = "success"
})
//删除
router.post('/Delate', async ( ctx ) => {
	  ctx.body = ctx.request.body;
//	  查询数据库
	  let GetModel = await students.remove({"_id":ctx.body.TableId})
	  console.log(ctx.body.TableId)
	  console.log(ctx.query.TableId)
   	ctx.response.body = GetModel
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")
