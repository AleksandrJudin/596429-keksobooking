'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var pinHalfWidth = window.data.mainPin.width / 2;

  var MapLimit = {
    top: 150 - window.data.mainPin.height,
    bottom: 500
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var hundlerMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (pinMain.offsetTop < MapLimit.top) {
        pinMain.style.top = MapLimit.top + 'px';
      } else if (pinMain.offsetTop + window.data.mainPin.height > MapLimit.bottom) {
        pinMain.style.top = MapLimit.bottom - window.data.mainPin.height + 'px';
      }

      if (pinMain.offsetLeft + pinHalfWidth < 0) {
        pinMain.style.left = 0 - pinHalfWidth + 'px';
      } else if (pinMain.offsetLeft + pinHalfWidth > map.offsetWidth) {
        pinMain.style.left = map.offsetWidth - pinHalfWidth + 'px';
      }

      window.util.setAddress();
    };

    var hundlerMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.util.setAddress();
      if (!document.querySelector('.map:not(.map--faded)')) {
        window.state.activatePage();
      }
      document.removeEventListener('mousemove', hundlerMouseMove);
      document.removeEventListener('mouseup', hundlerMouseUp);
    };

    document.addEventListener('mousemove', hundlerMouseMove);
    document.addEventListener('mouseup', hundlerMouseUp);
  });
})();
