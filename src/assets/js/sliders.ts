/* eslint-disable no-new */
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'


document.addEventListener('DOMContentLoaded', () => {
    const reviewSlider = document.querySelector('.reviews-slider') as HTMLElement
    
    new Swiper(reviewSlider, {
        modules: [Pagination],
        slidesPerView: 5,
        spaceBetween: 25,
        pagination: {
            el: '.reviews-slider__pagination',
            clickable: true,
        },
    })
})

export {}