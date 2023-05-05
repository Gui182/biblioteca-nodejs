import chalk from "chalk";
import searchFile from "./index.js";

const path = process.argv;

async function textProcess(path) {
    const result = await searchFile(path[2]);
    console.log(chalk.yellow('lista de links'), result);
}

textProcess(path);