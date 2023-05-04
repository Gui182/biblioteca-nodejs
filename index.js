import fs from 'fs';
import chalk from "chalk";

function linksExtract(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const objectMatch = [...text.matchAll(regex)];
    const result = objectMatch.map(obj => 
        ({[obj[1]]: obj[2]})    
    )

    return result;
}

function treatError(erro) {
    throw new Error(chalk.red(erro.code, 'Erro ao buscar arquivo no diretório'));
}

async function searchFile(pathFile) {
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(pathFile, encoding);
        console.log(linksExtract(text));
    } catch (error) {
        treatError(error)
    }
}

searchFile('./arquivos/texto.md')
