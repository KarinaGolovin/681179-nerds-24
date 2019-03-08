'use strict';

(function() {
  // Remove class which style modal window and catalog page without js
  document.body.classList.remove('no-js');

  const KEY_CODES = {
    enter: 13,
    esc: 27
  };
  const modalOpenButton = document.querySelector('.address__link');
  const modalWindow = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const modalCloseButton = modalWindow.querySelector('.modal__close');
  const modalOverlay = document.querySelector('.overlay');
  const contactForm = modalWindow.querySelector('.contact-form');
  const firstModalInput = modalWindow.querySelector('.contact-form__input');
  const modalInputs = toArray(modalWindow.querySelectorAll('.contact-form__input'));
  const contactFormSubmit = contactForm.querySelector('.contact-form__btn');

  // for IE understand forEach
  function toArray(nodes) {
    return [].slice.call(nodes);
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      // eslint-disable-next-line no-invalid-this
      var context = this;
      var args = toArray(arguments);

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
    };
  };

  function throttle(func, wait) {
    var timeout;
    return function () {
      let args = toArray(arguments);
      let context = this;

      if (!timeout) {
        timeout = setTimeout(function () {
          func.apply(context, args);
          timeout = null;
        }, wait);
      }
    };
  };

  // Open and close modal

  function openModal(event) {
    event.preventDefault();
    modalWindow.classList.remove('modal--disable');
    modalContent.classList.add('modal__content--active');
    modalContent.classList.add('modal__content--active-animation');
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
    modalContent.classList.remove('modal__content--active-animation');
    modalContent.classList.remove('modal__content--error');
    modalWindow.classList.add('modal--disable');
    modalInputs.forEach(function(input) {
      input.classList.remove('contact-form__input--error');
    });
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

  modalOpenButton.addEventListener('click', openModal);

  modalOpenButton.addEventListener('focus', function() {
    modalOpenButton.addEventListener('keydown', openModalOnEnter);
  });

  modalOpenButton.addEventListener('blur', function() {
    modalOpenButton.removeEventListener('keydown', openModalOnEnter);
  })

  modalCloseButton.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('focus', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  });

  modalCloseButton.addEventListener('blur', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  });

  document.addEventListener('keydown', closeModalOnEsc);
  modalWindow.addEventListener('click', closeModalOnOutClick);

  //  Input validity check

  modalInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      input.classList.remove('contact-form__input--error');
    });

    input.addEventListener('blur', validateInput);
  });

  function validateInput(event) {
    if (event.target.validity.valueMissing || event.target.validity.typeMismatch) {
      event.target.classList.add('contact-form__input--error');
    } else if (event.target.validity.valid) {
      event.target.classList.remove('contact-form__input--error');
    }
  };

  // Add animationend event on submit error

  contactFormSubmit.addEventListener('click', function (event) {
    modalContent.classList.remove('modal__content--error');
    modalContent.classList.remove('modal__content--active-animation');

    modalInputs.forEach(function(input) {
      if (!input.value) {
        setTimeout(function () {
          modalContent.classList.add('modal__content--error');
        }, 60);
      }
    });
  });

  // Slider

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

  if (document.querySelector('.range-area')) {
    const rangeElement = document.querySelector('.range-panel');
    const rangeScale = document.querySelector('.range-panel__scale--active');
    const rangeControllerMin = document.querySelector('.range-panel__controller--min');
    const rangeControllerMax = document.querySelector('.range-panel__controller--max');
    const rangeInputs = toArray(document.querySelectorAll('.range-inputs__value'));
    const rangeInputMin = document.querySelector('.range-inputs__value--min');
    const rangeInputMax = document.querySelector('.range-inputs__value--max');
    const rangeWidth = document.querySelector('.range-panel__scale').clientWidth;
    const RANGE_BOX_GAP = 20;
    const VALUE_MAX = 20000;
    const RANGE_RATIO = VALUE_MAX / (rangeWidth - RANGE_BOX_GAP);

    function limitValue(value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    function convertWithSeparator(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    function convertWithoutSeparator(value) {
      return value.replace(/\s+/g, '');
    }

    // меняем тип инпутов, вешаем листенер на ввод данных, оформляем вывод числа как на макете
    rangeInputs.forEach(function (element) {
      element.attributes['type'].value = 'text';
      // // стоит добавить debounce?
      // element.addEventListener('focus', function(event) {
      //   event.target.value = '';
      // });
      element.addEventListener('change', handleInputChange);
    });

    rangeInputs[1].value = VALUE_MAX;

    // подумать, как объединить мин макс инпут с мин макс рэнж
    function handleInputChange(event) {
      let inputValue = event.target.value;

      if(isNaN(inputValue) && event.target === rangeInputs[0]) {
        rangeInputs[0].value = 0;

        return;
      } else if (isNaN(inputValue) && event.target === rangeInputs[1]) {
        rangeInputs[1].value = VALUE_MAX;

        return;
      }

      if(inputValue > VALUE_MAX) {
        event.target.value = VALUE_MAX;
      } else if(inputValue < 0) {
        event.target.value = 0;
      }

      // Проверка чтоб число не было больше или меньше
      // if(rangeInputs[0].value > rangeInputs[1].value) {
      //   let value = rangeInputs[1].value;
      //   console.log('Должны быть равны');
      //   rangeInputs[0].value = value;
      // } else if (rangeInputs[1].value < rangeInputs[0].value) {
      //   let value = rangeInputs[0].value;
      //   rangeInputs[1].value = value;
      // }

      if(event.target === rangeInputMin) {
        let currentMinPosition = inputValue / RANGE_RATIO + RANGE_BOX_GAP;
        rangeControllerMin.style.left = currentMinPosition  + 'px';
        rangeScale.style.left = currentMinPosition + 'px';
        rangeScale.style.width = rangeControllerMax.offsetLeft - currentMinPosition + 'px';
      } else if (event.target === rangeInputMax) {
        let currentMaxPosition = inputValue / RANGE_RATIO + RANGE_BOX_GAP;
        rangeControllerMax.style.left = currentMaxPosition + 'px';
        rangeScale.style.left = rangeControllerMin.offsetLeft + 'px';
        rangeScale.style.width = currentMaxPosition - rangeControllerMin.offsetLeft + 'px';
      }
    };

    // Если пустые поля, чтоб заполнялись значением по умолчанию
    if (rangeInputs[0].value === '') {
      console.log(rangeInputs[0].value);
      rangeInputs[0].value = 0;
    }
    if (rangeInputs[1].value === '') {
      console.log(rangeInputs[1].value);
      rangeInputs[1].value = VALUE_MAX;
    }

    initRange({
      valueFrom: RANGE_BOX_GAP,
      valueTo: rangeWidth,
      from: 0,
      to: 100,
      onRangeChange: function (currentValueFrom, currentValueTo) {
        // rangeInputMin.value = convertWithSeparator(Math.floor(RANGE_RATIO * (currentValueFrom - RANGE_BOX_GAP)));
        // rangeInputMax.value = convertWithSeparator(Math.floor(RANGE_RATIO * (currentValueTo - RANGE_BOX_GAP)));
        rangeInputMin.value = Math.floor(RANGE_RATIO * (currentValueFrom - RANGE_BOX_GAP));
        rangeInputMax.value = Math.floor(RANGE_RATIO * (currentValueTo - RANGE_BOX_GAP));
        rangeScale.style.left = currentValueFrom + 'px';
        rangeScale.style.width = currentValueTo - currentValueFrom + 'px';
      }
    });

    function initRange(configuration) {
      let valueFrom = configuration.valueFrom || 0;
      let valueTo = configuration.valueTo || 100;

      makeControllerDraggable({
        element: rangeControllerMin,
        onValueUpdate: function (value) {
          valueFrom = limitValue(value, 0, valueTo);
          configuration.onRangeChange(valueFrom, valueTo);

          return valueFrom;
        }
      });

      makeControllerDraggable({
        element: rangeControllerMax,
        onValueUpdate: function (value) {
          valueTo = limitValue(value, valueFrom, rangeWidth);
          configuration.onRangeChange(valueFrom, valueTo);

          return valueTo;
        }
      });
    };

    function makeControllerDraggable(params) {
      let element = params.element;
      let onValueUpdate = params.onValueUpdate;

      if (!onValueUpdate) {
        onValueUpdate = function (value) {
          return value;
        };
      }

      let dragActive = false;
      let startPosition = {};

      element.addEventListener('mousedown', function (event) {
        dragActive = true;

        startPosition = {
          clientX: event.clientX,
          x: event.target.offsetLeft,
        };
      });

      function moveController(evt) {
        let deltaX = startPosition.clientX - evt.clientX;
        let positionX = startPosition.x - deltaX;
        let value = limitValue(positionX, RANGE_BOX_GAP, rangeWidth);
        let updatedValue = onValueUpdate(value);

        element.style.left = updatedValue + 'px';
      };

      function stopDrag() {
        dragActive = false;
      }

      document.addEventListener('mouseup', stopDrag);
      element.addEventListener('mouseup', stopDrag);

      rangeElement.addEventListener('mousemove', function (event) {
        if (!dragActive) {
          return;
        }
        moveController(event);
      });
    };
  }

  // Yandex map
  createMap();

  function createMap() {
    // Run when DOM is ready
    ymaps.ready(init);

    var pinCoordinates = [59.938631, 30.323055];
    var mapCoordinates = [59.93911012407403, 30.321370572738658];

    function init() {
      var myMap = new ymaps.Map("map", {
        center: mapCoordinates,
        zoom: 17,
        controls: []
      });

      var myPlacemark = new ymaps.Placemark(pinCoordinates, {
        hintContent: 'NЁRDS DESIGN STUDIO, ул. Б. Конюшенная, д. 19/8',
        balloonContent: 'ул. Б. Конюшенная, д. 19/8'
      }, {
          // type
          iconLayout: 'default#image',
          // pin image
          iconImageHref: 'img/png/map-marker.png',
          // pin size
          iconImageSize: [231, 190],
          // pin image x, y shift
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
      }, 300));
    };
  };
})();
