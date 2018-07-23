const Koa = require('koa');
const fs = require('fs');
const route = require('koa-route');
const app = new Koa();






const main = ctx => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000, () => {
  console.log('[myapp]已经运行，端口为3000')
})