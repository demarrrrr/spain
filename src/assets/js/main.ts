/* eslint-disable @typescript-eslint/no-unsafe-call */
const html = document.documentElement

/* FAQ toggles */

const items = document.querySelectorAll('.faq-block__item')

items.forEach((item) => {
    const question = item.querySelector('.faq-block__question') as HTMLElement
    question.addEventListener('click', () => {
        item.classList.toggle('faq-block__item--active')
    })  
})

/* mobileMenuToggle */

const mobileToggle = document.querySelector('.header__mobile-toggle') as HTMLElement
const mobileMenu = document.querySelector('.mobile-menu-wrap')
const mobileMenuWrap = document.querySelector('.mobile-menu-wrap__wrap') as HTMLElement
const header = document.querySelector('.header') 

mobileToggle.addEventListener('click', () => {
    header?.classList.toggle('header--active')
    html.classList.toggle('locked')
    mobileToggle.classList.toggle('header__mobile-toggle--active')
    mobileMenu?.classList.toggle('mobile-menu-wrap--active')
})

/* close menu */

document.addEventListener('click', (e) =>{   
    if (!mobileMenuWrap.contains(e.target as Node) && !mobileToggle.contains(e.target as Node)){
        header?.classList.remove('header--active')
        html.classList.remove('locked')
        mobileToggle.classList.remove('header__mobile-toggle--active')
        mobileMenu?.classList.remove('mobile-menu-wrap--active')
    }
})

