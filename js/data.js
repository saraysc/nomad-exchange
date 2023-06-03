var data = {
  days: [],
  heart: ['far fa-heart fa-xl icon', 'fas fa-heart fa-xl icon'],
  view: 'view-list',
  entries: {},
  editing: null,
  nextEntryId: 1,
  currencyRate: '',
  rates: 0
};

var previousDataJSON = localStorage.getItem('ajax-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-storage', dataJSON);
  // localStorage.clear();
});
