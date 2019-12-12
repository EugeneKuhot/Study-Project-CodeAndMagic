'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  window.upload = function (data, onSucsess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSucsess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
