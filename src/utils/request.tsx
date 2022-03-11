import configs from "@/configs";
import { extend } from "umi-request";

const request = extend({
  prefix: configs.baseUrl,
  errorHandler: (err) => {},
});

request.use(async (ctx, next) => {
  // const infoStr = await AsyncStorage.getItem('auth-info');
  const infoStr = "";
  try {
    if (!!infoStr) {
      const info = JSON.parse(infoStr);
      ctx.req.options.headers = {
        ...ctx.req.options.headers,
        Authorization: ``,
      };
    }
  } catch (err) {
    console.error(err);
  }

  await next();

  if (!ctx.res?.success) {
    if (ctx.res?.statusCode !== 200) {
      return;
    }
  }
});

export default request;
