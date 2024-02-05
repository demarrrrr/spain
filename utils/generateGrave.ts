import { resolve } from 'path'
import { readFileSync } from 'fs'

import dotenv from 'dotenv'

import environment from '../configuration/webpack.environment'

dotenv.config({ path: './.env' })

const totalPages = process.env.TOTAL_PAGES || 1
const projectName = process.env.PROJECT_NAME || 'Шаблон'

export const graveyardTemplate = (pages: string[]) => {
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
            <link rel='stylesheet'
                href='https://use.fontawesome.com/releases/v5.0.13/css/all.css?ver=5.8' media='all' />
            <link rel="stylesheet" href="https://graveyard.crazytest.studio/css/style.min.css">
            <title>Роадмап</title>
        </head>

        <body>

            <div class="fixed-progress">
                <div class="fixed-progress__text">Прогресс верстки &nbsp&nbsp<span class="progress-numbers-js">68%</span></div>
                <div class="progress-bar">
                    <div class="progress-bar__fill"></div>
                </div>
            </div>

            <header class="section header">
                <div class="container">
                    <div class="row header__row">
                        <div class="header__col">
                            <div class="logo">
                                <span>Crazy.Development</span>
                            </div>
                        </div>
                        <div class="header__col">
                        </div>
                    </div>
                </div>
            </header>

        <main class="section-wrap">

            <section class="section hero">
                <div class="container">
                    <div class="row">
                        <div class="hero__head">

                            <!-- Заголовок страницы + тэг -->
                            <div class="page-head" data-tag="Вёрстка проекта">
                                <h1 class="page-head__title">${projectName}</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <!-- Контент страницы -->
            <section class="section page-content-section">
                <div class="container">
                    <div class="row">
                        <div class="page-content">

                            <!-- Список страниц -->
                            <div class="page-content__list">
                                <div class="pages">
                                    <h2 class="pages__title">Список страниц</h2>
                                    <ul class="pages__list">
                                        <!-- Страница в списке -->
                                        ${pagesList.join(' ')}
                                    </ul>
                                </div>
                            </div>

                            <!-- Сайдбар -->
                            <div class="page-content__sidebar sidebar">

                                <!-- Виджет - Информация -->
                                <div class="info-block">
                                    <p>Для корректного отображения последних изменений не забывайте сбрасывать кэш в вашем
                                        браузере. Ctrl + F5 для Windows. Command+R для Mac.</p>
                                </div>

                                <!-- Виджет - Статус проекта -->
                                <div class="info-card">
                                    <div class="info-card__subtitle">Статус проекта</div>
                                    <div class="info-card__title status-js">В работе</div>
                                </div>

                                <!-- Виджет - Прогресс -->
                                <div class="info-card">
                                    <div class="info-card__subtitle">Прогресс</div>
                                    <div class="info-card__title progress-numbers-js">68%</div>
                                    <div class="info-card__text progress-text-js">Если не выйти на сцену, так и не узнаешь,
                                        полетят ли помидоры.</div>
                                </div>

                                <!-- Виджет - Благодарность -->
                                <div class="thanks-block">
                                    <h3 class="thanks-block__title">Спасибо за заказ</h3>
                                    <div class="thanks-block__text">
                                        <p>Всегда Ваша – команда Crazy Studio!</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <img src="https://graveyard.crazytest.studio/img/footer-wide.png" class="page-content-section__bg">
            </section>

        </main>
            <script>
                    document.addEventListener("DOMContentLoaded", () => {
                        const totalSlides = ${totalPages};
                        const doneSlides = ${pages.length};
                        const slideProgress = ~~((doneSlides / totalSlides) * 100);
                        const progressText = document.querySelector(".progress-text-js");
                        const fixedProgress = document.querySelector(".fixed-progress");
                        const status = document.querySelector(".status-js");
                        const bar = document.querySelector(".progress-bar__fill");
                        const numbers = document.querySelectorAll(".progress-numbers-js");

                        console.log(numbers)
                    
                        if (slideProgress >= 20) {
                            progressText.innerHTML = "Дорогу осилит идущий.";
                        }
                    
                        if (slideProgress >= 40) {
                            progressText.innerHTML = "Чтобы дождаться конца, нужно пройти начало и середину.";
                        }
                    
                        if (slideProgress >= 60) {
                            progressText.innerHTML = "Мы уже почти закончили.";
                        }
                    
                        if (slideProgress >= 80) {
                            progressText.innerHTML = "Для того, чтобы началось что-то новое, что-то должно закончиться.";
                        }
                    
                        if (slideProgress == 100) {
                            progressText.innerHTML = "Ну всё, товарищи! Фенита ля комедия.";
                            status.innerHTML = "Завершен"
                            fixedProgress.classList.add("fixed-progress--done");
                            bar.classList.add("progress-bar__fill--yum");
                        }
                    
                        bar.style.width = slideProgress + "%";
                        
                        numbers.forEach((el) => el.innerHTML = slideProgress + "%")
                    });
                </script>
            </body>
        </html>
        `
}
