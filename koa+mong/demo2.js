const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const main = ctx => {
   ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('test1.html');
};

app.use(main);
app.listen(3000, () => {
  console.log('[myapp]已经运行，端口为3000')
})