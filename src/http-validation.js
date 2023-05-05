import chalk from "chalk";

function extractLinks(arrLinks) {
    return arrLinks.map((objLink) => Object.values(objLink).join());
}

async function checkStatus(listURLs) {
    const arrStatus = await Promise.all(
        listURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;
            } catch (error) {
                return treatErrors(error)
            }

        })

    )
    return arrStatus;
}

function treatErrors(err) {
    if (err.cause.code === 'ENOTFOUND') {
        return 'link não encontrado'
    } else {
        return 'ocorreu algum erro'
    }
}

export default async function listValidated(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);

    return linksList.map((obj, indice) => ({
        ...obj,
        status: status[indice]
    }))
}


