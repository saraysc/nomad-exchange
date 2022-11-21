var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function saveInput(event) {
  event.preventDefault();
  var datas = event.target.elements.date.value;
  var convData = new Date(datas);
  var findDay = weekdays[convData.getDay()];
  var firstMoney = event.target.elements.firstCurrency.value;
  var secondMoney = event.target.elements.secondCurrency.value;
  var priceInt = parseInt($submit.elements.price.value);
  var entryObject = {
    date: datas,
    startTime: $submit.elements.time.value,
    endTime: $submit.elements.endTime.value,
    location: $submit.elements.location.value,
    firstCurrency: firstMoney,
    secondCurrency: secondMoney,
    price: priceInt,
    entryId: data.nextEntryId,
    currencies: (firstMoney + secondMoney).toUpperCase(),
    weekDay: findDay,
    totalUsd: data.rates * priceInt
  };
  var renderedEntry = newEntry(entryObject);
  data.currencyRate = entryObject.currencies;
  $list.prepend(renderedEntry);
  data.nextEntryId += 1;
  data.entries.unshift(entryObject);
  $submit.reset();

  viewSwap('view-list');

}

// function createPage(event) {
//   $createList.classList.remove('hidden');
//   $noList.classList.add('hidden');
// }

// function homePage(event) {
//   $createList.classList.add('hidden');
//   $noList.classList.remove('hidden');
//   if (data.entries.length > 0) {
//     $createNewbtn.className = 'button-container row hidden';
//     $addButton.className = 'add-button';
//   }
// }

function viewSwap(string) {
  var $dataViews = document.querySelectorAll('[data-view]');
  for (var i = 0; i < $dataViews.length; i++) {
    if ($dataViews[i].getAttribute('data-view') === string) {
      $dataViews[i].className = '';
    } else {
      $dataViews[i].className = 'hidden';
    }
  }
}

function newEntry(object) {

  if ($dateTitle.textContent === '') {
    $dateTitle.className = 'date-title';
    $dateTitle.textContent = object.date + ' ' + object.weekDay;
    $dateTitle.setAttribute('current-date', object.date);
  }

  var itineraryContainer = document.createElement('div');
  var listItem = document.createElement('li');
  listItem.className = 'list-container';

  var timeRow = document.createElement('div');
  timeRow.className = 'row list-margin padding-top relative-position';
  listItem.append(timeRow);

  var time = document.createElement('p');
  time.textContent = 'Time';
  time.className = 'time-margin';
  timeRow.append(time);
  listItem.append(timeRow);

  var timeValue = document.createElement('p');
  timeValue.textContent = object.startTime + ' ~ ' + object.endTime;
  timeRow.append(timeValue);

  var heartIcon = document.createElement('i');
  heartIcon.className = 'far fa-heart fa-xl icon';
  timeRow.append(heartIcon);

  var locationRow = document.createElement('div');
  locationRow.className = 'row list-margin';

  var location = document.createElement('p');
  location.textContent = 'Location';
  location.className = 'location-margin';
  locationRow.append(location);
  listItem.append(locationRow);

  var locationValue = document.createElement('p');
  locationValue.textContent = object.location;
  locationRow.append(locationValue);

  var conversionRow = document.createElement('div');
  conversionRow.className = 'row list-margin relative-position';

  var conversion = document.createElement('p');
  conversion.textContent = 'Total in USD';
  conversion.className = 'currency-margin';
  conversionRow.append(conversion);
  listItem.append(conversionRow);

  var currency2 = document.createElement('p');
  currency2.textContent = '$' + (Number(object.totalUsd).toFixed(2));
  conversionRow.append(currency2);

  var price = document.createElement('p');
  price.className = 'price-margin';
  price.textContent = object.firstCurrency.toUpperCase() + ' ' + object.price;
  conversionRow.append(price);

  var editDelete = document.createElement('a');
  editDelete.setAttribute('href', '#');
  editDelete.innerHTML = 'Update/Delete Itinerary';
  editDelete.className = 'edit-delete-margin font-label';
  listItem.append(editDelete);

  itineraryContainer.append(listItem);

  $listTitle.textContent = 'My Itinerary';
  $newItineraryContainer.className = 'new-itinerary-margin';
  $createNewbtn.className = 'row edit-create-button';
  listItem.setAttribute('data-entry-id', object.entryId);
  return listItem;
}

function contentLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = newEntry(data.entries[i]);
    $list.append(renderedEntry);
  }
  return $list;
}

function newItinerary(event) {
  viewSwap('new-list');
  $newTitle.textContent = 'Add Itinerary';
  // $submit.elements.date.value = event.target.closest('ul').getAttribute('current-date');
  $finalCreateBtn.textContent = 'Add Itinerary';
}

var $submit = document.querySelector('form');
$submit.addEventListener('submit', saveInput);

document.addEventListener('DOMContentLoaded', contentLoad);

var $createButton = document.querySelector('.create-button');
$createButton.addEventListener('click', function (event) {
  viewSwap('new-list');
  $finalCreateBtn.textContent = 'Create New\r\nItinerary List';
  $newTitle.textContent = 'Create New Itinerary List';
});

// var $createList = document.querySelector('.create');
// var $noList = document.querySelector('.no-listing');

var $listTitle = document.querySelector('.listing-title');
var $dateTitle = document.querySelector('.date-title');

var $list = document.querySelector('.list');

var $createNewbtn = document.querySelector('.button-container');
// var $addButton = document.querySelector('.add-button');

var $newItineraryBtn = document.querySelector('.new-itinerary');
$newItineraryBtn.addEventListener('click', newItinerary);

var $newTitle = document.querySelector('.title-new');
var $finalCreateBtn = document.querySelector('.final-create');

var $newItineraryContainer = document.querySelector('.new-itinerary-margin');

var targetUrl = encodeURIComponent('https://www.freeforexapi.com/api/live?pairs=' + data.currencyRate.toUpperCase());

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';

xhr.addEventListener('load', onLoad);
function onLoad(event) {

  data.rates = xhr.response.rates[data.currencyRate.toUpperCase()].rate;

}
xhr.send();
