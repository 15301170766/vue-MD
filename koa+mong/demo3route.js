const Koa = require('koa');
const fs = require('fs');
const route = require('koa-route');
const app = new Koa();





const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/aaaaa', main));
app.use(route.get('/about', about));
app.listen(3000, () => {
  console.log('[myapp]已经运行，端口为3000')
})