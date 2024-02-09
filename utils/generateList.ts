import { resolve } from 'path'
import { readFileSync } from 'fs'

import dotenv from 'dotenv'

import environment from '../configuration/webpack.environment'

dotenv.config({ path: './.env' })

export const listTemplate = (pages: string[]) => {
    const pagesList = pages.map((page: string) => {
        const pageContent = readFileSync(resolve(__dirname, environment.paths.source, 'pages', page), 'utf8')

        const titleComment = pageContent.match(/<!-- Название страницы:(.*?) -->/)

        const title = titleComment ? titleComment[1] : page

        return `<li class="pages__item"><a class="pages__url" target="_blank" href='${page}'>${title}</a></li>`
    })

    return `<!DOCTYPE html>
        <html lang="ru">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Список</title>
        </head>

        <body>

        <h2 class="pages__title">Список страниц</h2>
            <ul class="pages__list">
            <!-- Страница в списке -->
            ${pagesList.join(' ')}
            </ul>
        </div>

            </body>
        </html>
        `
}
