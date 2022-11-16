function save(event) {
  event.preventDefault();
  var entryObject = {
    date: $submit.elements.date.value,
    startTime: $submit.elements.time.value,
    endTime: $submit.elements.endTime.value,
    location: $submit.elements.location.value,
    weather: $submit.elements.weather.value,
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
}

function newEntry(object) {
  // var titleDate = document.createElement('p');
  var listItem = document.createElement('li');

  var timeRow = document.createElement('div');
  listItem.append(timeRow);

  var time = document.createElement('p');
  time.textContent = 'Time';
  timeRow.append(time);
  listItem.append(timeRow);

  var heartIcon = document.createElement('i');
  heartIcon.className = 'fa-light fa-heart';
  timeRow.append(heartIcon);

  var timeValue = document.createElement('p');
  timeValue.textContent = object.startTime + ' ~ ' + object.endTime;
  timeRow.append(timeValue);

  var locationRow = document.createElement('div');

  var location = document.createElement('p');
  location.textContent = 'Location';
  locationRow.append(location);
  listItem.append(locationRow);

  var locationValue = document.createElement('p');
  locationValue.textContent = object.location;
  locationRow.append(locationValue);

  var weatherRow = document.createElement('div');

  var weather = document.createElement('p');
  weather.textContent = 'Total in U$';
  weatherRow.append(weather);
  listItem.append(weatherRow);

  var weatherValue = document.createElement('p');
  weatherValue.textContent = object.weather;
  weatherRow.append(weatherValue);

  var price = document.createElement('p');
  price.textContent = object.price;
  weatherRow.append(price);

  $listTitle.textContent = '';
  listItem.setAttribute('data-entry-id', object.entryId);
  return listItem;
}

// function contentLoad(event) {
//   for (var i = 0; i < data.entries.length; i++) {
//     var renderedEntry = newEntry(data.entries[i]);
//     $list.append(renderedEntry);
//   }
//   return $list;
// }

var $submit = document.querySelector('form');
$submit.addEventListener('submit', save);

var $createButton = document.querySelector('.new-list-button');
$createButton.addEventListener('click', createPage);

var $createList = document.querySelector('.create');
var $noList = document.querySelector('.no-listing');

var $listTitle = document.querySelector('.listing-title');

var $list = document.querySelector('.list');
// var $item = document.querySelector('.item');

var $firstCurrency = document.getElementById('#firstCurrency');
var $secondCurrency = document.getElementById('#secondCurrency');

$firstCurrency.addEventListener('change', e => {
  // log(`e.target`, e.target);
  var select = e.target;
  var desc = select.options[select.selectedIndex].text;
  return desc;
});

$secondCurrency.addEventListener('change', e => {
  // log(`e.target`, e.target);
  var select2 = e.target;
  var desc2 = select2.options[select2.selectedIndex].text;
  return desc2;
});

var targetUrl = encodeURIComponent('https://www.freeforexapi.com/api/live');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(desc + desc2);
});
xhr.send();
