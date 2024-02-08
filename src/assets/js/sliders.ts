/* eslint-disable no-new */
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'


document.addEventListener('DOMContentLoaded', () => {
    const reviewSlider = document.querySelector('.reviews-slider') as HTMLElement
    
    new Swiper(reviewSlider, {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.reviews-slider__pagination',
            clickable: true,
        },

        breakpoints: {
            1200: {
                slidesPerView: 5,
                spaceBetween: 25,
            },

            768: {
                slidesPerView: 3,
                spaceBetween: 25,
            },

            579: {
                slidesPerView: 1,
                spaceBetween: 25,
            }
        }
    })
})

export {}