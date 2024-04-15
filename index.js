const koa = require("koa");
const bodyParser = require("koa-body-parser");
const Validator = require("validatorjs");
const Router = require("koa-router");

const app = new koa();
const router = new Router();

const port = 3000;

app.use(bodyParser());

const validRules = {
  Id: `id is required | ${Validator.message}`,
  Name: `name is required`,
  Email: `email is required`,
};

const validRequest = async (ctx, next) => {
  const data = ctx.request.body;
  console.log("response Data", data);

  const validation = new Validator(data, validRules);
  if (validation.passes()) {
    await next();
  } else {
    ctx.status = 400;
    ctx.body = {
      message: "validation failed",
      errors: validation.errors.all(),
    };
  }
};

router.post("/register", validRequest, async (ctx) => {
  ctx.status = 200;
  console.log("status ", ctx.status);
  ctx.body = { message: "Data is send Succesfully!" };
});

router.get("/", validRequest, async (ctx) => {
  ctx.message;
  ctx.body = "data is getting";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server running`);
});
