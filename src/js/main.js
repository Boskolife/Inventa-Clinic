import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.addEventListener('load', () => {
  setMenuTopPosition();
  initBurger();
  initSwipers();
  initAppointmentModal();
});

window.addEventListener('resize', () => {
  setMenuTopPosition();
});

function initBurger() {
  const burger = document.querySelector('.header_burger');
  const menu = document.querySelector('.header_nav');

  if (!burger || !menu) return;

  if (burger.dataset.bound === 'true') return;
  burger.dataset.bound = 'true';

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('show');
  });

  // Close menu on any link click inside the nav (mobile only)
  if (menu.dataset.linkbound !== 'true') {
    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      if (window.innerWidth < 1200 && menu.classList.contains('show')) {
        burger.classList.remove('open');
        menu.classList.remove('show');
      }
    });
    menu.dataset.linkbound = 'true';
  }
}

function setMenuTopPosition() {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.header_nav');

  if (!header || !menu) return;

  const headerHeight = header.offsetHeight;
  if (window.innerWidth < 1200) {
    menu.style.top = headerHeight + 'px';
    menu.style.height = `calc(100dvh - ${headerHeight}px)`;
  } else {
    menu.style.removeProperty('top');
    menu.style.removeProperty('height');
  }
}

function initSwipers() {
  const doctorsSwiperEl = document.querySelector('.doctors_swiper');
  if (doctorsSwiperEl) {
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
  }

  const blogSwiperEl = document.querySelector('.blog-section-swiper');
  if (blogSwiperEl) {
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
  }
}

function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('.btn.btn_primary, .js-open-appointment');
  const closeEls = modal.querySelectorAll('[data-modal-close]');

  const open = () => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.classList.add('modal-open');
    }
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    document.body.style.removeProperty('overflow');
    document.body.classList.remove('modal-open');
    document.documentElement.style.removeProperty('--scrollbar-width');
  };

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const text = (btn.textContent || '').toLowerCase();
      if (text.includes('записатися на прийом')) {
        e.preventDefault();
        open();
      }
    });
  });

  closeEls.forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      close();
    }
  });

  const form = modal.querySelector('#appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple success UX for now
      close();
    });
  }
}


