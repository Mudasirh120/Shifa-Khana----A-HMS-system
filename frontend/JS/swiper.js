
var swiper = new Swiper(".swiper-container1", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    400: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});
var swiper2 = new Swiper(".swiper-container2", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
  breakpoints: {
    400: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});
