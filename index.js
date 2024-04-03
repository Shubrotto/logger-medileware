const koa = require("koa");
const app = new koa();
const port = 3000;

app.use(async (ctx, next) => {
  const startMs = Date.now();
  await next();
  console.log(`${Date.now() - startMs} ms`);
  console.log(ctx.message);
});

app.use(async (ctx, next) => {
  ctx.body = "Hello Koa!, Now you are worked";
});

app.listen(port, () => {
  console.log(`Server running`);
});
