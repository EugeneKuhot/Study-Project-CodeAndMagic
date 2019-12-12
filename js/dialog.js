'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var userDialog = document.querySelector('.setup');
  var setupCloseButton = userDialog.querySelector('.setup-close');
  var dialogHandler = userDialog.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

      setupCloseButton.addEventListener('click', function () {
        userDialog.style.top = '80px';
        userDialog.style.left = '50%';
      });

      document.addEventListener('keydown', function () {
        if (evt.keyCode === ESC_KEYCODE) {
          userDialog.style.top = '80px';
          userDialog.style.left = '50%';
        }
      });
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (ewent) {
          ewent.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
