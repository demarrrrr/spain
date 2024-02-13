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
    const headerLinks = document.querySelectorAll('.header-menu__link, .mobile-menu__link')

    let isMenuOpened = false

    const toggleMenu = () => {
        isMenuOpened = !isMenuOpened
        header?.classList.toggle('header--active')
        document.documentElement.classList.toggle('locked')
        mobileToggle.classList.toggle('header__mobile-toggle--active')
        mobileMenu?.classList.toggle('mobile-menu-wrap--active')
    }

    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation()
        toggleMenu()
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
            const currentURL = window.location.href.split('#')[0]

            if (linkEl.hash) {
                const urlWithoutHash = linkEl.href.split('#')[0]

                if (urlWithoutHash.toLowerCase() === currentURL.toLowerCase()) {
                    e.preventDefault()
                }

                scrollToAnchor(linkEl.hash)

                if (window.matchMedia('(max-width: 940px)').matches) {
                    toggleMenu()
                }
            }
        })
    })
}


const initBodyPadding = () => {
    const header = document.querySelector('.header') as HTMLElement | undefined

    if (!header) return

    setTimeout(() => {
        document.body.style.paddingTop = `${header.offsetHeight}px`
    }, 10)

}

const initWidget = () => {
    const widgetToggle = document.querySelector('.socials-widget__toggle') as HTMLElement

    widgetToggle.addEventListener('click', () => {
        const parent = widgetToggle.parentNode as HTMLElement

        parent.classList.toggle('socials-widget__wrap--active')
    })
}

const initNextBlockBtns = () => {
    const header = document.querySelector('.header') as HTMLElement | undefined
    const nextBlockBtns = document.querySelectorAll('[data-next-block-btn]')

    nextBlockBtns.forEach((el) => {
        el.addEventListener('click', () => {
            const closestParentSection = el.closest('article')
            const nextSection = closestParentSection?.nextSibling?.nextSibling

            if (!nextSection) return

            const offset = header?.offsetHeight || 0
            window.scrollTo({
                top: (nextSection as HTMLElement).offsetTop - offset
            })
        })
    })
}

const initAOS = () => {
    AOS.init({
        startEvent: 'load',
    })

    window.scrollBy({
        top: 1,
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initFaqToggles()
    initMobileMenuInteractions()
    initBodyPadding()
    initWidget()
    initNextBlockBtns()
    initAOS()
})

window.addEventListener('load', () => {
    initUrlAnchor()
})

window.addEventListener('resize', () => {
    initBodyPadding()
})
