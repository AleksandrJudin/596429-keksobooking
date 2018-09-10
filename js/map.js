'use strict';

var NUMBER_OF_OFFERS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_HOUSE = ['flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var shuffleArray = function (array) { 
  var arrayCopy = array.slice();
  var mixedArray = [];
  while (mixedArray.length < array.length) {
    var randomIndex = getRandomIndex(arrayCopy.length);
    mixedArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }
  return mixedArray;
};

var getOfferObject = function (index) {
  var titlesArrayCopy = TITLES.slice();

  var randomIForTitlesArrayCopy = getRandomIndex(titlesArrayCopy.length);
  var randomIForTypes = getRandomIndex(TYPES_OF_HOUSE.length);
  var randomIForCheckin = getRandomIndex(CHECKIN_TIME.length);
  var randomIForCheckout = getRandomIndex(CHECKOUT_TIME.length);

  var featuresArrayShuffleCopy = shuffleArray(FEATURES);
  featuresArrayShuffleCopy.splice(0, getRandomIndex(featuresArrayShuffleCopy.length));

  var mixedPhotosArray = shuffleArray(PHOTOS);
  var randomX = getRandomNumber(300, 900);
  var randomY = getRandomNumber(150, 500);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': titlesArrayCopy.splice(randomIForTitlesArrayCopy, 1)[0], 
      'address': randomX + ',' + randomY,
      'price': getRandomNumber(1000, 1000000),
      'type': TYPES_OF_HOUSE[randomIForTypes],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 10),
      'checkin': CHECKIN_TIME[randomIForCheckin],
      'checkout': CHECKOUT_TIME[randomIForCheckout],
      'features': featuresArrayShuffleCopy,
      'description': '',
      'photos': mixedPhotosArray
    },
    'location': {
      'x': randomX,
      'y': randomY
    }
  };
};

var offers = [];
for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  offers.push(getOfferObject(i));
}


document.querySelector('.map').classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var createButtonElement = function (object) {
  var newButtonElement = document.createElement('button');
  newButtonElement.style.left = (object.location.x + 20) + 'px';
  newButtonElement.style.top = (object.location.y + 40) + 'px';
  newButtonElement.className = 'map__pin';

  var newImgElement = document.createElement('img');
  newImgElement.src = object.author.avatar;
  newImgElement.width = 40;
  newImgElement.height = 40;
  newImgElement.draggable = false;

  newButtonElement.appendChild(newImgElement);
  return newButtonElement;
};

var renderPins = function () {
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offers.length; i++) {
    documentFragment.appendChild(createButtonElement(offers[i]));
  }
  mapPins.appendChild(documentFragment);
};

var offerCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

var getTypeOfHouse = function (offerType) {
  var typeOfHouse;
  switch (offerType) {
    case 'flat':
      typeOfHouse = 'Квартира';
      break;

    case 'bungalo':
      typeOfHouse = 'Бунгало';
      break;

    case 'house':
      typeOfHouse = 'Дом';
      break;
  }
  return typeOfHouse;
};

var getFeaturesArrayElement = function (featuresElement, offerFeaturesArray) {

  // удаляю иконки из шаблона, которые идут по умолчанию
  var featureElement = featuresElement.querySelectorAll('.feature');
  for (i = 0; i <= 5; i++) {
    featuresElement.removeChild(featureElement[i]);
  }
  // создаю фрагмент для <li>
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offerFeaturesArray.length; i++) {
    var newFeatureElement = document.createElement('li');
    newFeatureElement.className = 'feature feature--' + offerFeaturesArray[i];
    documentFragment.appendChild(newFeatureElement);
  }
  // добавляю <li> в нужный блок
  featuresElement.appendChild(documentFragment);
};

var featuresElement = authorOfferCardElement.querySelector('.popup__features');
  getFeaturesArrayElement(featuresElement, object.offer.features);
  // удаляю строку <li> из шаблона
  var picturesElement = authorOfferCardElement.querySelector('.popup__pictures');
  var pictureElement = picturesElement.querySelector('li');
  picturesElement.removeChild(pictureElement);
  // создаю фрагмент для <li> и вложенного в него <img>
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offers[0].offer.photos.length; i++) {
    var newLiElementSecond = document.createElement('li');
    var newImgElementForLi = document.createElement('img');
    newImgElementForLi.src = object.offer.photos[i];
    newImgElementForLi.width = 70;
    newImgElementForLi.height = 70;
    newLiElementSecond.appendChild(newImgElementForLi);
    documentFragment.appendChild(newLiElementSecond);
  }
  // вывожу фрагмент в нужный блок
  picturesElement.appendChild(documentFragment);
  authorOfferCardElement.querySelector('.popup__avatar').src = object.author.avatar;
  return authorOfferCardElement;
};

document.querySelector('.map').insertBefore(renderOfferCard(offers[0]), document.querySelector('.map__filters-container'));

// вызываю ф-цию отрисовки меток
renderPins();