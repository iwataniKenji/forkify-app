class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value; // valor da barra de search
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // publisher
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // controlResults()
    })
  };
}

export default new SearchView();
