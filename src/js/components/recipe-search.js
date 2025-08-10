// components/recipe-search.js
export class RecipeSearch {
  constructor(onSearch) {
    this.searchInput = document.getElementById('Query');
    this.searchButton = document.getElementById('searchBtn');
    this.onSearch = onSearch;
    
    this.searchButton.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
  }

  handleSearch() {
    const query = this.searchInput.value.trim();
    if (query) {
      this.onSearch(query);
    }
  }
}