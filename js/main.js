var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function dayOfWeek(date) {
  var [year, month, day] = date.split('-');
  var finalDate = [month, day, year].join('-');
  var convData = new Date(finalDate);
  var findDay = weekdays[convData.getDay()];
  return findDay;
}
function saveInput(event) {
  event.preventDefault();
  var datas = event.target.elements.date.value;
  var firstMoney = event.target.elements.firstCurrency.value;
  var priceInt = parseInt($submit.elements.price.value);
  var secondMoney = event.target.elements.secondCurrency.value;
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
    click: false
  };
  getRate(entryObject);
  data.nextEntryId += 1;
  if (data.entries[datas]) {
    data.entries[datas].push(entryObject);
  } else {
    data.entries[datas] = [entryObject];
  }
  if (!data.days[datas]) {
    data.days.push(datas);
  }
  $submit.reset();

  viewSwap('view-list');
}

function viewSwap(string) {
  var $dataViews = document.querySelectorAll('[data-view]');
  for (var i = 0; i < $dataViews.length; i++) {
    if ($dataViews[i].getAttribute('data-view') === string) {
      $dataViews[i].className = '';
    } else {
      $dataViews[i].className = 'hidden';
    }
    if (string === 'view-list') {
      data.editing = null;
    }
  }
}

function newEntry(object) {

  var date = document.createElement('p');
  for (const i in data.entries) {

    if (data.entries[i].indexOf(object.date) > 0) {
      date.className = 'hidden';
    } else {

      date.textContent = object.date + ' ' + dayOfWeek(object.date);
      date.className = 'date-title text-align-center';
    }

  }

  var listItem = document.createElement('li');
  listItem.className = 'list-container';
  listItem.append(date);
  var itineraryContainer = document.createElement('div');
  itineraryContainer.className = 'list-box margin-auto';

  var timeRow = document.createElement('div');
  timeRow.className = 'row list-margin padding-top relative-position';
  itineraryContainer.append(timeRow);

  var time = document.createElement('p');
  time.textContent = 'Time';
  time.className = 'subtitle bold';
  timeRow.append(time);
  itineraryContainer.append(timeRow);

  var timeValue = document.createElement('p');
  timeValue.textContent = object.startTime + ' ~ ' + object.endTime;
  timeRow.append(timeValue);

  var heartIcon = document.createElement('i');
  if (!object.click) {
    heartIcon.className = 'far fa-heart fa-xl icon';
  } else {
    heartIcon.className = 'fas fa-heart fa-xl icon';
  }
  heartIcon.setAttribute('icon', object.entryId);
  timeRow.append(heartIcon);

  var locationRow = document.createElement('div');
  locationRow.className = 'row list-margin';

  var location = document.createElement('p');
  location.textContent = 'Location';
  location.className = 'subtitle bold';
  locationRow.append(location);
  itineraryContainer.append(locationRow);

  var locationValue = document.createElement('p');
  locationValue.textContent = object.location;
  locationRow.append(locationValue);

  var conversionRow = document.createElement('div');
  conversionRow.className = 'row list-margin relative-position';

  var conversion = document.createElement('p');
  conversion.textContent = 'Total in USD';
  conversion.className = 'subtitle bold';
  conversionRow.append(conversion);
  itineraryContainer.append(conversionRow);

  var currency2 = document.createElement('p');
  currency2.textContent = '$' + +(Number(data.rates * object.price).toFixed(2));
  conversionRow.append(currency2);

  var price = document.createElement('p');
  price.className = 'price-margin';
  price.textContent = `${object.firstCurrency.toString().toUpperCase()} ${object.price}`;
  conversionRow.append(price);

  var editDelete = document.createElement('a');
  editDelete.setAttribute('href', '#');
  editDelete.innerHTML = 'Update/Delete Itinerary';
  editDelete.className = 'edit-delete-margin relative-position font-label';
  editDelete.setAttribute('link-id', object.entryId);
  itineraryContainer.append(editDelete);

  var currencyImage = document.createElement('div');
  var image = document.createElement('img');
  if (object.firstCurrency === 'eur') {
    image.src = './images/euro.PNG';
    image.alt = 'Europe';
  } else if (object.firstCurrency === 'gbp') {
    image.src = './images/great-britain.PNG';
    image.alt = 'Great Britain';
  } else if (object.firstCurrency === 'aud') {
    image.src = './images/australia.png';
    image.alt = 'Australia';
  } else if (object.firstCurrency === 'nzd') {
    image.src = './images/new-zealand.png';
    image.alt = 'New Zealand';
  }

  image.className = 'currency-img relative-position';
  currencyImage.append(image);
  itineraryContainer.append(currencyImage);

  listItem.append(itineraryContainer);
  $listTitle.textContent = 'My Itinerary';
  $introText.className = 'display-none';
  $createNewbtn.className = 'row edit-create-button center relative-position';
  listItem.setAttribute('data-entry-id', object.entryId);

  return listItem;
}

function contentLoad(event) {
  const ordered = Object.keys(data.entries).sort().reduce(
    (obj, key) => {
      obj[key] = data.entries[key];
      return obj;
    },
    {}
  );
  for (const i in ordered) {
    for (let m = 0; m < ordered[i].length; m++) {

      $list.append(newEntry(ordered[i][m]));
    }
  }

  return $list;
}

function handleEditSubmit(event) {
  // event.preventDefault();
  data.editing.date = $submit.elements.date.value;
  data.editing.startTime = $submit.elements.time.value;
  data.editing.endTime = $submit.elements.endTime.value;
  data.editing.firstCurrency = event.target.elements.firstCurrency.value;
  data.editing.location = $submit.elements.location.value;
  data.editing.price = $submit.elements.price.value;

  var $nodeToReplace = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
  viewSwap('view-list');
  return $nodeToReplace.replaceWith(saveInput(data.editing));
}

function iconChange(object) {
  if (event.target.tagName === 'I') {
    const element = document.querySelectorAll('i');
    for (const i in data.entries) {
      for (let m = 0; m < data.entries[i].length; m++) {
        if (data.entries[i][m].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {

          var $nodeToReplace = document.querySelector(`li[data-entry-id="${data.entries[i][m].entryId}"]`);
          if (data.entries[i][m].click === true) {
            element[m].class = 'fas fa-heart fa-xl icon';
            data.entries[i][m].click = false;
            $nodeToReplace.replaceWith(newEntry(data.entries[i][m]));
          } else if (data.entries[i][m].click === false) {
            element[m].class = 'far fa-heart fa-xl icon';
            data.entries[i][m].click = true;
            $nodeToReplace.replaceWith(newEntry(data.entries[i][m]));
          }

        }
      }

    }
  }
}

function editDelete() {
  if (event.target.tagName !== 'A') {
    return;
  }
  if (event.target && event.target.tagName === 'A') {
    for (const i in data.entries) {
      for (let m = 0; m < data.entries[i].length; m++) {
        if (data.entries[i][m].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
          data.editing = data.entries[i][m];
        }
      }
    }
  }
  viewSwap('new-list');
  $newTitle.textContent = 'Edit/Delete Entry';
  $finalCreateBtn.textContent = 'Edit Itinerary';
  $submit.elements.date.value = data.editing.date;
  $submit.elements.time.value = data.editing.startTime;
  $submit.elements.endTime.value = data.editing.endTime;
  $submit.elements.firstCurrency.value = data.editing.firstCurrency;
  $submit.elements.location.value = data.editing.location;
  $submit.elements.price.value = data.editing.price;
  $deleteContainer.classList.remove('hidden');

}
function showModal(event) {
  myModal.className = 'modal-content margin-auto center';
  modalBox.className = 'modal';
}

function hideModal(event) {

  myModal.className = 'modal-content margin-auto hidden center';
  modalBox.className = 'modal hidden';
}

var $submit = document.querySelector('form');
$submit.addEventListener('submit', function (event) {
  if (data.editing) {
    return handleEditSubmit(event);
  } else {
    return saveInput(event);
  }
});

function deleteItinerary(event) {

  var entryDataId = data.editing.entryId;
  var entryNodeList = document.querySelectorAll('.list-container');

  for (var i = 0; i < entryNodeList.length; i++) {
    if (entryNodeList[i].getAttribute('data-entry-id') === entryDataId.toString()) {
      entryNodeList[i].remove();
    }
    for (const i in data.entries) {
      for (let m = 0; m < data.entries[i].length; m++) {
        if (entryDataId === data.entries[i][m].entryId) {
          data.entries[i].splice(m, 1);
        }

      } if (Object.keys(data.entries[i]).length === 0) {
        delete data.entries[i];
      }
    }
  }

  if (Object.keys(data.entries).length === 0) {
    $listTitle.textContent = 'No Listing Available';
    $introText.className = 'row center display-unset intro-text';
  }
  hideModal();
  viewSwap('view-list');
}

document.addEventListener('DOMContentLoaded', contentLoad);
var $deleteContainer = document.querySelector('.delete-container');

var $createButton = document.querySelector('.create-button');
$createButton.addEventListener('click', function (event) {
  viewSwap('new-list');
  $deleteContainer.className = 'delete-container hidden';
  $finalCreateBtn.textContent = 'Create New\r\nItinerary List';
  $newTitle.textContent = 'Create New Itinerary List';
  $submit.reset();
  $dateInput.disabled = false;
});

var $listTitle = document.querySelector('.listing-title');

var $list = document.querySelector('.list');

var $createNewbtn = document.querySelector('.button-container');

var $newTitle = document.querySelector('.title-new');
var $finalCreateBtn = document.querySelector('.final-create');

var $dateInput = document.getElementById('date');

var $ul = document.querySelector('ul');
$ul.addEventListener('click', editDelete);

var $cancelBtn = document.querySelector('.cancel');
$cancelBtn.addEventListener('click', cancelBtn);

function cancelBtn(event) {
  return viewSwap('view-list');
}

var $firstDelete = document.querySelector('.first-delete');
var $cancelDelete = document.querySelector('.cancel-delete');
var myModal = document.querySelector('.modal-content');
var modalBox = document.querySelector('.modal');
$firstDelete.addEventListener('click', showModal);
$cancelDelete.addEventListener('click', hideModal);

function getRate(entryObject) {
  data.currencyRate = (entryObject.firstCurrency + 'USD').toUpperCase();
  var targetUrl = encodeURIComponent('https://www.freeforexapi.com/api/live?pairs=' + data.currencyRate);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';

  function onLoad(event) {

    data.rates = xhr.response.rates[data.currencyRate].rate;
    entryObject.totalUsd = data.rates * entryObject.price;
    var renderedEntry = newEntry(entryObject);
    $list.append(renderedEntry);
  }
  xhr.addEventListener('load', onLoad);

  xhr.send();
}

var $introText = document.querySelector('.display-unset');

var $confirmDelete = document.querySelector('.confirm-delete');
$confirmDelete.addEventListener('click', deleteItinerary);

var $divs = document.querySelector('html');
$divs.addEventListener('click', iconChange);
