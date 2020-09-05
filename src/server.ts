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

app.post("/", async (req: expressive.Request, res: expressive.Response) => {
  const { title, description } = JSON.parse(
    new TextDecoder()
      .decode(req.body)
      .replace(/\0/g, "")
      .split("\r\n\r\n")[1]
      .replace(/\s/g, "")
  );

  if (!title) throw new Error("Title is required.");

  if (!description) throw new Error("Description is required.");

  await res.json({
    status: "success",
    data: DataST.getInstance().addSimpleData({ title, description }),
  });
});

app.get("/{id}", async (req: expressive.Request, res: expressive.Response) => {
  await res.json({
    status: "success",
    data: DataST.getInstance().getOneSimpleData(req.params.id),
  });
});

app.patch(
  "/{id}",
  async (req: expressive.Request, res: expressive.Response) => {
    const { title, description } = JSON.parse(
      new TextDecoder()
        .decode(req.body)
        .replace(/\0/g, "")
        .split("\r\n\r\n")[1]
        .replace(/\s/g, "")
    );

    await res.json({
      status: "success",
      data: DataST.getInstance().updateOneSimpleData(req.params.id, {
        title,
        description,
      }),
    });
  }
);

app.delete(
  "/{id}",
  async (req: expressive.Request, res: expressive.Response) => {
    await res.json({
      status: "success",
      data: DataST.getInstance().deleteOneSimpleData(req.params.id),
    });
  }
);

const server = await app.listen(port);
log.info(`> app listening at http://127.0.0.1:${port}`);
