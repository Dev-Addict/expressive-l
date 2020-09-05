import { expressive, log } from "./deps.ts";

import { PORT } from "./config.ts";

const port: number = PORT || 3000;

const app: expressive.App = new expressive.App();

const server = await app.listen(port);
log.info(`> app listening at http://127.0.0.1:${port}`);
