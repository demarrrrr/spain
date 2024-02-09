import AOS from 'aos'

const scrollToAnchor = (id: string) => {
    const target = document.querySelector(id) as HTMLElement | undefined
    const header = document.querySelector('.header') as HTMLElement | undefined

    if (!target) return

    const offset = header?.offsetHeight || 0

    window.scrollTo({
        top: target.offsetTop - offset,
    })
}

const initUrlAnchor = () => {
    const { hash } = window.location

    if (!hash) return
    
    scrollToAnchor(hash)
}

const initFaqToggles = () => {
    const items = document.querySelectorAll('.faq-block__item')

    items.forEach((item) => {
        const question = item.querySelector(
            '.faq-block__question',
        ) as HTMLElement
        question.addEventListener('click', () => {
            item.classList.toggle('faq-block__item--active')
        })
    })
}

const initMobileMenuInteractions = () => {
    const mobileToggle = document.querySelector(
        '.header__mobile-toggle',
    ) as HTMLElement

    const mobileMenu = document.querySelector('.mobile-menu-wrap')

    const mobileMenuWrap = document.querySelector(
        '.mobile-menu-wrap__wrap',
    ) as HTMLElement

    const header = document.querySelector('.header')
    const headerLinks = document.querySelectorAll('.header-menu__link')

    let isMenuOpened = false

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation()
        isMenuOpened = !isMenuOpened
        header?.classList.toggle('header--active')
        document.documentElement.classList.toggle('locked')
        mobileToggle.classList.toggle('header__mobile-toggle--active')
        mobileMenu?.classList.toggle('mobile-menu-wrap--active')
    })

    /* close menu on document click */
    document.addEventListener('click', (e) => {
        if (!isMenuOpened) return
        
        if (!mobileMenuWrap.contains(e.target as HTMLElement)) {
            header?.classList.remove('header--active')
            document.documentElement.classList.remove('locked')
            mobileToggle.classList.remove('header__mobile-toggle--active')
            mobileMenu?.classList.remove('mobile-menu-wrap--active')
        }
    })

    /* Header links */

    headerLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const linkEl = link as HTMLAnchorElement

            if (linkEl.hash) {
                e.preventDefault()

                scrollToAnchor(linkEl.hash)
            }
        })
    })
}

const widgetToggle = document.querySelector('.socials-widget__toggle') as HTMLElement

widgetToggle.addEventListener('click', () => {
    const parent = widgetToggle.parentNode as HTMLElement

    parent.classList.toggle('socials-widget__wrap--active')
})

document.addEventListener('DOMContentLoaded', () => {
    AOS.init()

    initFaqToggles()
    initMobileMenuInteractions()
    initUrlAnchor()
})
