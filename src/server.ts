import { expressive, log } from "./deps.ts";

import DataST from "./DataST.ts";
import { PORT } from "./config.ts";

const port: number = PORT || 3000;

const app: expressive.App = new expressive.App();

app.use(
  async (
    req: expressive.Request,
    res: expressive.Response,
    next: () => Promise<void>
  ) => {
    const startTime = Date.now();

    await next();

    const reqTime = Date.now() - startTime + "ms";

    log.info(res.status, req.method, req.url, reqTime);
  }
);

app.get("/", async (req: expressive.Request, res: expressive.Response) => {
  await res.json({
    status: "success",
    data: DataST.getInstance().getSimpleData(),
  });
});

const server = await app.listen(port);
log.info(`> app listening at http://127.0.0.1:${port}`);
