'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupIcon = document.querySelector('.setup-open-icon');
  var setupCloseButton = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpenButton.addEventListener('click', function () {
    openPopup();
  });

  setupIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupCloseButton.addEventListener('click', function () {
    closePopup();
  });

  setupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  userNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  userNameInput.addEventListener('invalid', function (evt) {
    if (evt.userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (evt.userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (evt.userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  var getRandomCoat = function () {
    var coatColor = COAT_COLORS[getRandomInteger(0, COAT_COLORS.length)];
    return coatColor;
  };

  var getWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(getWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function (_response) {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var wizardCoatInput = document.querySelector('input[name="coat-color"]');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');

  wizardCoat.addEventListener('click', function () {
    var randomCoat = getRandomCoat();

    wizardCoat.style.fill = randomCoat;
    wizardCoatInput.value = randomCoat;
  });

  var getRandomEyes = function () {
    var eyesColor = EYES_COLORS[getRandomInteger(0, EYES_COLORS.length - 1)];
    return eyesColor;
  };

  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name="eyes-color"]');

  wizardEyes.addEventListener('click', function () {
    var randomEyes = getRandomEyes();

    wizardEyesInput.value = randomEyes;
    wizardEyes.style.fill = randomEyes;

  });

  var getRandomFireColor = function () {
    var fireballColor = FIREBALL_COLORS[getRandomInteger(0, FIREBALL_COLORS.length - 1)];
    return fireballColor;
  };

  var wizardFireBall = document.querySelector('.setup-fireball-wrap');

  var fireBallInput = document.querySelector('input[name="fireball-color"]');

  wizardFireBall.addEventListener('click', function () {
    var randomFireballColor = getRandomFireColor();

    wizardFireBall.style.background = randomFireballColor;
    fireBallInput.value = randomFireballColor;
  });

  // var getRandomWizard = function (names, surnames, coatColors, eyesColors) {
  //   return {
  //     name: names[getRandomInteger(0, names.length - 1)],
  //     surname: surnames[getRandomInteger(0, surnames.length - 1)],
  //     coatColor: coatColors[getRandomInteger(0, coatColors.length - 1)],
  //     eyesColor: eyesColors[getRandomInteger(0, eyesColors.length - 1)]
  //   };
  // };

  // var getFullWizard = function (randomWizard, templateElement) {
  //   var wizardElement = templateElement.cloneNode(true);
  //   wizardElement.querySelector('.setup-similar-label').textContent = randomWizard.name + ' ' + randomWizard.surname;
  //   wizardElement.querySelector('.wizard-coat').style.fill = randomWizard.coatColor;
  //   wizardElement.querySelector('.wizard-eyes').style.fill = randomWizard.eyesColor;
  //   return wizardElement;
  // };
})();
