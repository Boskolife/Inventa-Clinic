import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
initBurger();
window.addEventListener('load', () => {
  setMenuTopPosition();
  initBurger();
});

window.addEventListener('resize', () => {
  setMenuTopPosition();
  initBurger();
});

function initBurger() {
  const burger = document.querySelector('.header_burger');
  const menu = document.querySelector('.header_nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('show');
  });
}

function setMenuTopPosition() {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.header_nav');

  const headerHeight = header.offsetHeight;
  if (window.innerWidth < 1200) {
    menu.style.top = headerHeight + 'px';
    menu.style.height = `calc(100dvh - ${headerHeight}px)`;
  } else {
    menu.style.removeProperty('top');
    menu.style.removeProperty('height');
  }
}

new Swiper('.doctors_swiper', {
  slidesPerView: 'auto',
  spaceBetween: 11,
  modules: [Navigation],
  speed: 1250,
  navigation: {
    nextEl: '.doctors-button-next.swiper-button-next',
    prevEl: '.doctors-button-prev.swiper-button-prev',
  },
});

new Swiper('.blog-section-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  modules: [Navigation],
  speed: 1250,
  navigation: {
    nextEl: '.blog-section-button-next.swiper-button-next',
    prevEl: '.blog-section-button-prev.swiper-button-prev',
  },
});
