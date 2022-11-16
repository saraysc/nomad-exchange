var data = {
  view: 'view-list',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
