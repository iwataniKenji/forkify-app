class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value; // valor da barra de search
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  // publisher
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // controlResults()
    })
  };
}

export default new SearchView();
