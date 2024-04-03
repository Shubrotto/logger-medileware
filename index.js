const koa = require("koa");
const app = new koa();
const port = 3000;

app.use(async (ctx, next) => {
  console.log(ctx);
  await next();
});

app.use(async (ctx, next) => {
  ctx.body = "Hello Koa";
  console.log(ctx);
  await next();
});

app.use((ctx) => {
  console.log(`${(ctx.duraions = Date.now())} ms`);
  console.log(ctx.message);
});

app.listen(port, () => {
  console.log(`Server running`);
});
