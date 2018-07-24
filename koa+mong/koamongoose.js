
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');//解决跨域请求问题中间件
var User = require("./mongooseSchema.js");

app.use(cors());
app.use(bodyParser());

//查询所有数据
router.post('/ddd', async ( ctx ,next) => {
  ctx.response.type = 'text/html';
  //console.log(ctx.query.TableId)
  ctx.body = ctx.request.body
	  //console.log(ctx)
	  const rows = parseInt(ctx.body.rows);
let pages = (parseInt(ctx.body.page) - 1)*rows;
console.log(pages);
console.log(typeof(rows));
let aa;
await User.find({}).skip(pages).limit(rows).sort({"text":1}).then(function(res,err){
	  if (err) {
            aa= err;
        }
        else {
        console.log("Res:" + res);
        aa = res
        }
});
let total =await	User.find({}).count();
            
            aa = {"res":aa,"total":total}
ctx.response.body = aa;
  	//ctx.response.body = await students.find({},{sort:{"text":1}},{limit:rows},{skip:pages});
});
//GetModel
router.post('/GetModel', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
//	  查询数据库
   	  var wherestr = {'_id' : ctx.body.TableId};
    
  await  User.find(wherestr).then(function(res, err){
        if (err) {
            ctx.response.body = err;
        }
        else {
            console.log("Res:" + res);
            ctx.response.body = res;
        }
    })
   	
})
//编辑
router.post('/Edit', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
	  console.log(ctx.body)
//	  查询数据库
	
   	    var wherestr = {'_id' : ctx.body.TableId};
    var updatestr = {"text":ctx.body.Name,"parent":ctx.body.parent};
    
await    User.update(wherestr, updatestr).then(function (res, err) {//使用。then可以正常返回

        if (err) {
            ctx.response.body = "Error:" + err
        }
        else {
            ctx.response.body ="success"
        }

    })
})
//新增
router.post('/Add', async ( ctx ) => {
	ctx.response.type = 'text/html';
	  ctx.body = ctx.request.body;
	  console.log(ctx.body)
//	  查询数据库
	  //console.log(ctx.body.TableId)
	  //console.log(ctx.query.TableId)
   	
// for(let i =0;i<10000;i++){
// 			    let user = new User({
//      text : ctx.body.Name + Math.ceil(Math.random()*10)  ,                 //用户账号
//      parent : ctx.body.parent + Math.ceil(Math.random()*100)  ,                 //用户账号
//  });
//  user.save({});
//  console.log(i)
// 	}
   	let user = new User({
        text : ctx.body.Name,                 //用户账号
        parent : ctx.body.parent,                 //用户账号
    });

await  user.save({}).then(function (res, err) {//使用。then可以正常返回

        if (err) {
            ctx.response.body = "Error:" + err
        }
        else {
            ctx.response.body ="success"
        }

    });
   	
   //ctx.response.body ="success"	
   	
   	
   	
})
//删除
router.post('/Delate', async ( ctx ) => {
	  ctx.body = ctx.request.body;
//	  查询数据库
	  //let GetModel = await students.remove({"_id":ctx.body.TableId});
   	
   	    var wherestr = {'_id' : ctx.body.TableId};
    
  await  User.remove(wherestr).then(function (res, err) {//使用。then可以正常返回

        if (err) {
            ctx.response.body = "Error:" + err
        }
        else {
            ctx.response.body ="success"
        }

    })
   	
   	
   	
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

console.log("listen 3000")
