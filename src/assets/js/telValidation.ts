import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {
    const parents = document.querySelectorAll('[data-tel-wrap]')

    parents.forEach((parent) => {
        const items = parent.querySelectorAll('[data-tel-item]')
        const iconTarget = parent.querySelector(
            '[data-icon-target]',
        ) as HTMLImageElement | undefined
        const codeTarget = parent.querySelector(
            '[data-code-target]',
        ) as HTMLElement | undefined
        const toggle = parent.querySelector('[data-tel-toggle]') as HTMLElement | undefined
        const input = parent.querySelector(
            '[data-tel-input]',
        ) as HTMLInputElement | undefined
        const defaultMaskLocation = parent.querySelector(
            '[data-tel-code]',
        ) as HTMLElement | undefined
        let mainMask

        if (!input) return

        if (defaultMaskLocation) {
            mainMask = defaultMaskLocation.dataset.telCode
        }

        toggle?.addEventListener('click', () => {
            parent.classList.toggle('form-main__list-wrap--show-list')
        })

        const maskOptions = {
            mask: mainMask,
        }

        const mask = IMask(input, maskOptions)

        items.forEach((item) => {
            item.addEventListener('click', () => {
                const icon = item.querySelector('[data-tel-icon]') as
                    | HTMLImageElement
                    | undefined
                const code = item.querySelector('[data-tel-code]') as
                    | HTMLElement
                    | undefined
                const src = icon?.getAttribute('src') as string
                mainMask = code?.dataset.telCode

                if (iconTarget) {
                    iconTarget.setAttribute('src', `${src}`)
                }
                if (codeTarget) {
                    codeTarget.textContent = code?.textContent || ''
                }
                parent.classList.remove('form-main__list-wrap--show-list')

                if (mainMask) {
                    input.setAttribute(
                        'placeholder',
                        mainMask.replaceAll('0', '_'),
                    )
                }

                if (mask.value) {
                    mask.updateOptions({ mask: mainMask })
                }
            })
        })

        /* close menu on document click */
        document.addEventListener('click', (e) => {
            if (!parent.contains(e.target as HTMLElement)) {
                parent?.classList.remove('form-main__list-wrap--show-list')
            }
        })
    })
})
