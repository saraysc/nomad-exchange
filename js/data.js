var data = {
  view: 'view-list',
  entries: [],
  editing: null,
  nextEntryId: 1,
  currencyRate: '',
  rate: 0
};

var previousDataJSON = localStorage.getItem('ajax-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-storage', dataJSON);
});

var targetUrl = encodeURIComponent('https://www.freeforexapi.com/api/live?pairs=' + data.currencyRate.toUpperCase());

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';

xhr.addEventListener('load', onLoad);
function onLoad(event) {
  for (var key in xhr.response.length) {
    data.rate = xhr.response.rates[key].rate;
  }

}
xhr.send();
