import fs from 'fs';
import chalk from "chalk";

function linksExtract(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const objectMatch = [...text.matchAll(regex)];
    const result = objectMatch.map(obj => 
        ({[obj[1]]: obj[2]})    
    )

    return result.length !== 0 ? result : 'não há links no arquivo';
}

function treatError(erro) {
    throw new Error(chalk.red(erro.code, 'Erro ao buscar arquivo no diretório'));
}

async function searchFile(pathFile) {
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(pathFile, encoding);
        return linksExtract(text);
    } catch (error) {
        treatError(error)
    }
}

export default searchFile;
