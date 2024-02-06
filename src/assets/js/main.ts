/* FAQ toggles */

const items = document.querySelectorAll('.faq-block__item')

items.forEach((item) => {
    const question = item.querySelector('.faq-block__question') as HTMLElement
    question.addEventListener('click', () => {
        item.classList.toggle('faq-block__item--active')
    })  
})
