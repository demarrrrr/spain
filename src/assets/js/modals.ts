document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal')
    const togglers = document.querySelectorAll('[data-modal]')

    togglers.forEach((btn) => {
        const btnEL = btn as HTMLButtonElement

        btnEL.addEventListener('click', (e) => {
            e.preventDefault()
            const { modal } = btnEL.dataset

            if (modal) {
                const modalEl = document.querySelector(`#${modal}`) as HTMLDialogElement | undefined
                modalEl?.showModal()
            }
        })
    })

    modals.forEach((modal) => {
        const modalEl = modal as HTMLDialogElement
        const modalWrap = modal.querySelector('.modal__content')

        const modalObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                const { type, attributeName } = mutation
                const targetEl = mutation.target as HTMLElement

                if (type === 'attributes' && attributeName === 'open') {
                    if (targetEl.hasAttribute('open')) {
                        const scrollbarWidth = window.innerWidth - document.body.clientWidth

                        document.documentElement.classList.add('locked')
                        if (window.matchMedia('(hover: hover)').matches) document.documentElement.style.paddingRight = `${scrollbarWidth}px`

                        Object.assign(modalEl.style, {
                            opacity: 0,
                            display: 'flex'
                        })

                        setTimeout(() => {
                            modalEl.style.opacity = '1'
                        })

                        return
                    }

                    modalEl.style.opacity = '0'

                    document.documentElement.style.paddingRight = '0px'
                    document.documentElement.classList.remove('locked')

                    setTimeout(() => {
                        modalEl.style.display = 'none'
                    }, 500)
                }
            })
        })

        modalEl.addEventListener('click', (e) => {
            const targetEl = e.target as HTMLElement

            if (!modalWrap?.contains(targetEl)) modalEl.close()
        })

        modalEl.querySelector('.modal__close')?.addEventListener('click', () => {
            modalEl.close()
        })

        modalEl.addEventListener('close', () => {
            document.documentElement.classList.remove('locked')
        })

        modalObserver.observe(modalEl, {
            attributes: true
        })
    })
})

export {}
