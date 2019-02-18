'use strict';

(function() {
  const modalOpenButton = document.querySelector('.address__link');
  modalOpenButton.addEventListener('click', function (event) {
    event.preventDefault();
  });

  /**
   * Native dialog element not used due to the:
   * https://github.com/edenspiekermann/a11y-dialog/issues/89
   */
  document.addEventListener('DOMContentLoaded', function () {
    var dialogEl = document.getElementById('my-accessible-dialog');
    var mainEl = document.querySelector('.content--shop');
    var overlay = dialogEl.querySelector('.dialog-overlay');
    var dialog = new window.A11yDialog(dialogEl, mainEl);
  });

//   const KEY_CODES = {
//     enter: 13,
//     esc: 27
//   };

//   const modalOpenButton = document.querySelector('.address__link');
//   const modalWindow = document.querySelector('.modal');
//   const modalContent = document.querySelector('.modal__content');
//   const modalCloseButton = modalWindow.querySelector('.modal__close');
//   const modalSubmitButton = modalWindow.querySelector('.contact-form__btn');
//   const modalOverlay = document.querySelector('.overlay');
//   const contactForm = modalWindow.querySelector('.contact-form');

//   function openModal(event) {
//     event.preventDefault();
//     modalWindow.classList.remove('modal--disable');
//     modalOpenButton.blur();
//     focusLock.on(modalContent);
//   }

//   function openModalOnEnter(event) {
//     if (event.keyCode === KEY_CODES.enter) {
//       event.preventDefault();
//       openModal();
//     }
//   };

//   function closeModal() {
//     modalWindow.classList.add('modal--disable');
//     contactForm.reset();
//     focusLock.off(modalContent);
//   };

//   function closeModalOnEnter(event) {
//     if (event.keyCode === KEY_CODES.enter) {
//       event.preventDefault();
//       closeModal();
//     }
//   };

//   function closeModalOnEsc(event) {
//     if (event.keyCode === KEY_CODES.esc) {
//       event.preventDefault();
//       closeModal();
//     }
//   };

//   function closeModalOnOutClick(event) {
//     event.preventDefault();
//     if (event.target === modalOverlay) {
//       closeModal();
//     }
//   };

//   //Open Modal
//   modalOpenButton.addEventListener('click', openModal);

//   modalOpenButton.addEventListener('focus', function() {
//     modalOpenButton.addEventListener('keydown', openModalOnEnter);
//   });

//   modalOpenButton.addEventListener('blur', function() {
//     modalOpenButton.removeEventListener('keydown', openModalOnEnter);
//   })

//   //Close
//   modalCloseButton.addEventListener('click', closeModal);
//   modalCloseButton.addEventListener('focus', function() {
//     modalCloseButton.addEventListener('keydown', closeModalOnEnter);
//   });
//   modalCloseButton.addEventListener('blur', function() {
//     modalCloseButton.addEventListener('keydown', closeModalOnEnter);
//   })
//   document.addEventListener('keydown', closeModalOnEsc);
//   modalWindow.addEventListener('click', closeModalOnOutClick);

  // Input validity check?


  // Submit modal

  // Slider
  document.querySelectorAll('.slider').forEach(function (slider) {
    const sliderButtons = slider.querySelectorAll('.slider-switcher__button');

    let activeSlide = slider.querySelector('.slider-element--active');
    let currentSliderId = activeSlide.getAttribute('data-id');
    let activeButton = slider.querySelector('.slider-switcher__button[data-id=' + currentSliderId + ']');

    function handleSliderButtonClick(event) {
      let clickedButton = event.currentTarget;
      let nextSlideId = clickedButton.getAttribute('data-id');

      if (nextSlideId === currentSliderId) {
        return;
      }

      activeSlide.classList.remove('slider-element--active');
      activeButton.classList.remove('slider-switcher__button--active');

      let nextSlide = slider.querySelector('.slider__slide[data-id=' + nextSlideId + ']');
      let nextButton = clickedButton;

      nextSlide.classList.add('slider-element--active');
      nextButton.classList.add('slider-switcher__button--active');

      activeSlide = nextSlide;
      activeButton = nextButton;
      currentSliderId = nextSlideId;
    };

    sliderButtons.forEach(function (element) {
      element.addEventListener('click', handleSliderButtonClick);
    });
  });
})();

