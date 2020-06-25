'use strict';
(function () {
  // module4-task2
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.children;
  var mapFilters = document.querySelector('.map__filters').children;
  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var PIN_LEG = 20;
  var adFormReset = document.querySelector('.ad-form__reset');
  var mapPinsField = document.querySelector('.map__pins');
  var isPageActive = false;
  var initialMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  var getAddressCoords = function (currentPin) {
    return Math.round(currentPin.offsetLeft + currentPin.offsetWidth / 2) + ', ' + Math.round(currentPin.offsetTop + currentPin.offsetHeight + PIN_LEG);
  };

  var disableElements = function (parent) {
    for (var elementDisable = 0; elementDisable < parent.length; elementDisable++) {
      parent[elementDisable].disabled = true;
    }
  };

  var enableElements = function (parent) {
    for (var elementEnable = 0; elementEnable < parent.length; elementEnable++) {
      parent[elementEnable].disabled = false;
    }
  };

  var deactivatePage = function () {
    disableElements(adFormElements);
    disableElements(mapFilters);
    addressField.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    if (!document.querySelector('.map').classList.contains('map--faded')) {
      document.querySelector('.map').classList.add('map--faded');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    window.formValidation.removeFormValidationListeners();
    mainPin.style.left = initialMainPinCoords.x;
    mainPin.style.top = initialMainPinCoords.y;
    addressField.value = getAddressCoords(mainPin);
    isPageActive = false;
  };

  var activatePage = function () {
    enableElements(adFormElements);
    enableElements(mapFilters);
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.formValidation.addFormValidationListeners();
    mapPinsField.appendChild(window.generateFragment());
    addressField.value = getAddressCoords(mainPin);
    isPageActive = true;
  };

  deactivatePage();

  // Взаимодействие в меткой можно позже вынести в модуль map.js
  mainPin.addEventListener('mousedown', function (evt) {
    if ((evt.buttons === 1) && (!isPageActive)) {
      activatePage();
      // todo позже реализовать функционал перетаскивания главной метки
      addressField.value = getAddressCoords(mainPin);
    } else if ((evt.buttons === 1) && (isPageActive)) {
      addressField.value = getAddressCoords(mainPin);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      addressField.value = getAddressCoords(mainPin);
    }
  });

  adFormReset.addEventListener('mousedown', function (evt) {
    if (evt.buttons === 1) {
      deactivatePage();
    }
  });

  adFormReset.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      deactivatePage();
    }
  });
})();