import * as log from "https://deno.land/std/log/mod.ts";

let commandsFile;

try {
  commandsFile = await Deno.readFile("run.json");
} catch (err) {
  log.error(`couldn't load run.json:`, err);
  Deno.exit();
}

const commands = JSON.parse(new TextDecoder("utf-8").decode(commandsFile));

function run(name: string) {
  name in commands
    ? exec(commands[name].split(" "))
    : log.error(`Task "${name}" not found`);
}

async function exec(args: string[]) {
  const proc = await Deno.run({ cmd: args }).status();

  if (proc.success == false) {
    Deno.exit(proc.code);
  }

  return proc;
}

run(Deno.args[0]);
