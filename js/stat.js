'use strict';

(function () {
  // Объявление констант
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var OFFSET = 10;
  var CONGRAT_MESSAGE_X = 120;
  var CONGRAT_MESSAGE_Y = 40;
  var COLUMN_WIDTH = 40;
  var MAX_COLUMN_HEIGHT = 140;
  var INTERVAL = 50;
  var BASE_POSITION_X = 140;

  // Рисует текст
  var drawText = function (ctx, message, x, y) {
    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    ctx.fillText(message, x, y);
  };

  // Рисует облако/тень
  var drawCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // Поиск максимального значения
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  // Рисует колонки статистики и имена игроков
  var drawStatistics = function (ctx, names, times) {

    var maxTime = Math.round(getMaxElement(times));

    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var columnBorderBottom = 240;
      var columnHeight = Math.round((MAX_COLUMN_HEIGHT * times[i]) / maxTime);
      var columnPositonX = BASE_POSITION_X + (i * (INTERVAL + COLUMN_WIDTH));
      var columnPositonY = columnBorderBottom - columnHeight;
      var playerNamePositionX = BASE_POSITION_X + (i * (INTERVAL + COLUMN_WIDTH));
      var playerNamePositionY = 260;
      var playerTimePositionX = playerNamePositionX;
      var playerTimePositionY = columnPositonY - OFFSET;

      if (name === 'Вы') {
        ctx.fillStyle = 'hsl(0, 100%, 50%)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
      }
      ctx.fillRect(columnPositonX, columnPositonY, COLUMN_WIDTH, columnHeight); // Рисует колонки статистики
      drawText(ctx, name, playerNamePositionX, playerNamePositionY); // Рисует имя игрока
      drawText(ctx, Math.round(times[i]), playerTimePositionX, playerTimePositionY); // Рисует время игрока.
    }
  };

  // Функциия, отрисовывающая полную статистику
  window.renderStatistics = function (ctx, names, times) {
    drawCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
    drawCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
    drawText(ctx, 'Ура вы победили!', CONGRAT_MESSAGE_X, CONGRAT_MESSAGE_Y);
    drawText(ctx, 'Список результатов:', CONGRAT_MESSAGE_X, CONGRAT_MESSAGE_Y + (OFFSET * 2));
    drawStatistics(ctx, names, times);
  };
})();
