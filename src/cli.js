import chalk from "chalk";
import fs from 'fs'
import searchFile from "./index.js";
import listValidated from "./http-validation.js";

const path = process.argv;

async function printList(valid, result, identity = '') {

    if (valid) {
        console.log(
            chalk.yellow('lista de links'),
            chalk.black.bgGreen(identity),
            await listValidated(result));
    } else {
        console.log(
            chalk.yellow('lista de links'),
            chalk.black.bgGreen(identity),
            result);
    }

}


async function textProcess(path) {
    const relativePath = path[2];
    const valid = path[3] === '--valid';


    try {
        fs.lstatSync(relativePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return;
        }
    }

    if (fs.lstatSync(relativePath).isFile()) {

        const result = await searchFile(relativePath);
        printList(valid, result);
    } else if (fs.lstatSync(relativePath).isDirectory()) {

        const files = await fs.promises.readdir(relativePath);
        files.forEach(async (fileName) => {
            const list = await searchFile(`${relativePath}/${fileName}`);
            printList(valid, list, fileName);
        });
    }
}

textProcess(path);