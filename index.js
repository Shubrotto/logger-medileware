const koa = require("koa");
const bodyParser = require("koa-body-parser");
const Validator = require("validatorjs");

const app = new koa();

const port = 3000;

app.use(bodyParser());

const validRules = {
  Id: `id is required | ${Validator.message}`,
  Name: `name is required`,
  Email: `email is required`,
};

app.use(async (ctx, next) => {
  const data = ctx.request.body;
  console.log("response Data", data);

  const validation = new Validator(data, validRules);
  console.log(validation.passes());
  if (validation.passes()) {
    ctx.body = `
    Data is successfully saved! 
    `;
    await next();
  } else {
    ctx.response.status = 400;
    console.log(ctx.response.status);
    ctx.body = {
      message: "validation failed",
      Error: validation.errors.all(),
    };
    validation.errors.first("id");
  }
});

app.use(async (ctx, next) => {
  ctx.status = 200;
});

app.listen(port, () => {
  console.log(`Server running`);
});
