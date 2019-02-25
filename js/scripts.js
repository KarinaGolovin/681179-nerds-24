'use strict';

(function() {
  const KEY_CODES = {
    enter: 13,
    esc: 27
  };

  // Remove class which style modal window without js
  document.body.classList.remove('no-js');

  const modalOpenButton = document.querySelector('.address__link');
  const modalWindow = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const modalCloseButton = modalWindow.querySelector('.modal__close');
  const modalOverlay = document.querySelector('.overlay');
  const contactForm = modalWindow.querySelector('.contact-form');
  const firstModalInput = modalWindow.querySelector('.contact-form__input');
  const contactFormSubmit = contactForm.querySelector('.contact-form__btn');

  function openModal(event) {
    event.preventDefault();
    modalWindow.classList.remove('modal--disable');
    modalContent.classList.add('modal__content--active');

    firstModalInput.focus();
    modalOpenButton.blur();
  }

  function openModalOnEnter(event) {
    if (event.keyCode === KEY_CODES.enter) {
      event.preventDefault();
      openModal();
    }
  };

  function closeModal() {
    modalContent.classList.remove('modal__content--active');
    modalWindow.classList.add('modal--disable');
    contactForm.reset();
  };

  function closeModalOnEnter(event) {
    if (event.keyCode === KEY_CODES.enter) {
      event.preventDefault();
      closeModal();
    }
  };

  function closeModalOnEsc(event) {
    if (event.keyCode === KEY_CODES.esc) {
      event.preventDefault();
      closeModal();
    }
  };

  function closeModalOnOutClick(event) {
    if (event.target === modalOverlay) {
      event.preventDefault();
      closeModal();
    }
  };

  //Open Modal
  modalOpenButton.addEventListener('click', openModal);

  modalOpenButton.addEventListener('focus', function() {
    modalOpenButton.addEventListener('keydown', openModalOnEnter);
  });

  modalOpenButton.addEventListener('blur', function() {
    modalOpenButton.removeEventListener('keydown', openModalOnEnter);
  })

  //Close
  modalCloseButton.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('focus', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  });

  modalCloseButton.addEventListener('blur', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  });

  document.addEventListener('keydown', closeModalOnEsc);
  modalWindow.addEventListener('click', closeModalOnOutClick);

  // //  Input validity check and Submit modal
  // // Add animationend event
  // const nameInput = modalWindow.querySelector('[name=name-input]');
  // const mailInput = modalWindow.querySelector('[name=email-input]');

  // contactFormSubmit.addEventListener('click', function(event) {
  //   modalContent.classList.remove('modal__content--error');

  //   if (!nameInput.value || !mailInput.value) {
  //     event.preventDefault();
  //     modalContent.classList.add('modal__content--error');
  //   }
  // });

  // Slider
  function toArray(nodes) {
    return [].slice.call(nodes);
  }

  toArray(document.querySelectorAll('.slider')).forEach(function (slider) {
    const sliderButtons = toArray(slider.querySelectorAll('.switch-panel__button'));

    let activeSlide = slider.querySelector('.slide--active');
    let currentSliderId = activeSlide.getAttribute('data-id');
    let activeButton = slider.querySelector('.switch-panel__button[data-id=' + currentSliderId + ']');

    function handleSliderButtonClick(event) {
      let clickedButton = event.currentTarget;
      let nextSlideId = clickedButton.getAttribute('data-id');

      if (nextSlideId === currentSliderId) {
        return;
      }

      activeSlide.classList.remove('slide--active');
      activeButton.classList.remove('switch-panel__button--active');

      let nextSlide = slider.querySelector('.slider__element[data-id=' + nextSlideId + ']');
      let nextButton = clickedButton;

      nextSlide.classList.add('slide--active');
      nextButton.classList.add('switch-panel__button--active');

      activeSlide = nextSlide;
      activeButton = nextButton;
      currentSliderId = nextSlideId;
    };

    sliderButtons.forEach(function (element) {
      element.addEventListener('click', handleSliderButtonClick);
    });
  });

  // Range

  // Yandex map
  createMap();

  function createMap() {
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);

    var pinCoordinates = [59.938631, 30.323055];
    var mapCoordinates = [59.93911012407403, 30.321370572738658];

    function init() {
      // Создание карты.
      var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: mapCoordinates,
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 17,
        controls: []
      });

      var myPlacemark = new ymaps.Placemark(pinCoordinates, {
        hintContent: 'NЁRDS DESIGN STUDIO, ул. Б. Конюшенная, д. 19/8',
        balloonContent: 'ул. Б. Конюшенная, д. 19/8'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/png/map-marker.png',
          // Размеры метки.
          iconImageSize: [231, 190],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-55, -210]
        });

      myMap.geoObjects.add(myPlacemark);

      // Lock map scroll
      var isScrollLocked = false;
      window.addEventListener('scroll', function (event) {
        if (isScrollLocked) {
          return;
        }

        isScrollLocked = true;
        myMap.behaviors.disable('scrollZoom');
      });

      window.addEventListener('scroll', debounce(function() {
        isScrollLocked = false;
        myMap.behaviors.enable('scrollZoom');
      }, 300))
    };
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      // eslint-disable-next-line no-invalid-this
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    }
  }
})();

