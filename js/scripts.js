'use strict';

(function() {
  var KEY_CODES = {
    enter: 13,
    esc: 27
  };

  var modalOpenButton = document.querySelector('.address__link');
  var modalWindow = document.querySelector('.modal');
  var modalCloseButton = modalWindow.querySelector('.modal__close');
  var modalSubmitButton = modalWindow.querySelector('.contact-form__btn');

  function openModal(event) {
    console.log('Its works')
    modalWindow.classList.remove('modal--disable');
    modalOpenButton.blur();
  }

  function openModalOnEnter(event) {
    if (event.keyCode === KEY_CODES.enter) {
      event.preventDefault();
      openModal();
    }
  };

  function closeModal(event) {
    modalWindow.classList.add('modal--disable');
  };

  function closeModalOnEnter(event) {
    if (event.keyCode === KEY_CODES.enter) {
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
    modalOpenButton.addEventListener('keydown', openModalOnEnter);
  })

  //Close
  modalCloseButton.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('focus', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  });
  modalCloseButton.addEventListener('blur', function() {
    modalCloseButton.addEventListener('keydown', closeModalOnEnter);
  })

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_CODES.esc) {
      event.preventDefault();
      closeModal();
    }
  });



  // Submit modal

}
)();
