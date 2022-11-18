var dateControl = document.querySelector('input[type="date"]');
function save(event) {
  event.preventDefault();
  var entryObject = {
    date: $submit.elements.date.value,
    startTime: $submit.elements.time.value,
    endTime: $submit.elements.endTime.value,
    location: $submit.elements.location.value,
    firstCurrency: $submit.elements.firstCurrency.value,
    secondCurrency: $submit.elements.secondCurrency.value,
    price: $submit.elements.price.value,
    entryId: data.nextEntryId
  };
  var renderedEntry = newEntry(entryObject);
  $list.prepend(renderedEntry);
  data.nextEntryId += 1;
  data.entries.unshift(entryObject);
  $submit.reset();

  homePage();
}

function createPage(event) {
  $createList.classList.remove('hidden');
  $noList.classList.add('hidden');
}

function homePage(event) {
  $createList.classList.add('hidden');
  $noList.classList.remove('hidden');
  if (data.entries.length > 0) {
    $createNewbtn.className = 'button-container row hidden';
    $addButton.className = 'add-button';
  }
}

function newEntry(object) {
  var listContainer = document.createElement('div');
  listContainer.className = 'half-container';

  var titleDate = document.createElement('h3');
  titleDate.textContent = dateControl.value;
  titleDate.className = 'listing-title';
  listContainer.prepend(titleDate);

  var itineraryContainer = document.createElement('div');
  var listItem = document.createElement('li');
  listItem.className = 'list-container';

  var timeRow = document.createElement('div');
  timeRow.className = 'row list-margin';
  listItem.append(timeRow);

  var time = document.createElement('p');
  time.textContent = 'Time';
  time.className = 'time-margin';
  timeRow.append(time);
  listItem.append(timeRow);

  var heartIcon = document.createElement('i');
  heartIcon.className = 'fa-light fa-heart';
  timeRow.append(heartIcon);

  var timeValue = document.createElement('p');
  timeValue.textContent = object.startTime + ' ~ ' + object.endTime;
  timeRow.append(timeValue);

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
  conversionRow.className = 'row list-margin';

  var conversion = document.createElement('p');
  conversion.textContent = 'Total in USD';
  conversion.className = 'currency-margin';
  conversionRow.append(conversion);
  listItem.append(conversionRow);

  var currency1 = document.createElement('p');
  currency1.textContent = object.firstCurrency;
  conversionRow.append(currency1);

  var currency2 = document.createElement('p');
  currency2.textContent = object.firstCurrency;
  conversionRow.append(currency2);

  var price = document.createElement('p');
  price.className = 'price-margin';
  price.textContent = object.price;
  conversionRow.append(price);

  var editDelete = document.createElement('a');
  editDelete.setAttribute('href', '#');
  editDelete.innerHTML = 'Update/Delete Itinerary';
  editDelete.className = 'edit-delete-margin font-label';
  listItem.append(editDelete);

  itineraryContainer.prepend(listItem);

  $listTitle.textContent = 'My Itinerary';
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

var $submit = document.querySelector('form');
$submit.addEventListener('submit', save);

var $createButton = document.querySelector('.new-list-button');
$createButton.addEventListener('click', createPage);

var $createList = document.querySelector('.create');
var $noList = document.querySelector('.no-listing');

var $listTitle = document.querySelector('.listing-title');

var $list = document.querySelector('.list');

var $createNewbtn = document.querySelector('.button-container');
var $addButton = document.querySelector('.add-button');
// var $item = document.querySelector('.item');

// var $firstCurrency = document.getElementById('#firstCurrency');
// var $secondCurrency = document.getElementById('#secondCurrency');

// $firstCurrency.addEventListener('change', function (event) {
//   var result = $firstCurrency.value;
//   return result;

// });

// $secondCurrency.addEventListener('change', function (event) {
//   var output = $secondCurrency.value;
//   return output;
// });

// var dateControl = document.querySelector('input[type="date"]');

var targetUrl = encodeURIComponent('https://www.freeforexapi.com/api/live');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(result + output);
});
xhr.send();
document.addEventListener('DOMContentLoaded', contentLoad);
