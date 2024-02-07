/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import IMask from 'imask'

const parents = document.querySelectorAll('[data-tel-wrap]')

parents.forEach((parent) => {
    const items = parent.querySelectorAll('[data-tel-item]')
    const iconTarget = parent.querySelector('[data-icon-target]') as HTMLImageElement
    const codeTarget = parent.querySelector('[data-code-target]') as HTMLElement
    const toggle = parent.querySelector('[data-tel-toggle]') as HTMLElement
    const input = parent.querySelector('[data-tel-input]') as HTMLInputElement
    const defaultMaskLocation = parent.querySelector('[data-tel-code]') as HTMLElement
    let mainMask

    if (defaultMaskLocation) {
        mainMask = defaultMaskLocation.dataset.telCode
    }
 
    toggle.addEventListener('click', () => {
        parent.classList.toggle('form-main__list-wrap--show-list')
    })

    const maskOptions = {
        mask: mainMask
    }

    const mask = IMask(input, maskOptions)

    items.forEach((item) => {
        item.addEventListener('click', () => {
            const icon = item.querySelector('[data-tel-icon]') as HTMLImageElement
            const code = item.querySelector('[data-tel-code]') as HTMLElement
            const src = icon.getAttribute('src') as string
            mainMask = code.dataset.telCode

            if (iconTarget) {
                iconTarget.setAttribute('src', `${src}`)
            }
            if (codeTarget) {
                codeTarget.textContent = code.textContent
            }
            parent.classList.remove('form-main__list-wrap--show-list')

            if (mainMask) {
                input.setAttribute('placeholder', mainMask)
            }

            if (mask.value) {
                mask.updateOptions({ mask: mainMask })
            }
        })
    })

})
