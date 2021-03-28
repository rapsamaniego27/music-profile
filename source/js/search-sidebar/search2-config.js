/* Search Config */
let template = `
  <li class="list-group-item background-primary">
      <a href="{url}" class="hex-tertiary" title="{title}">{title}</a>
      <br>
      <small>{date}</small>
    </li>   
`;

SimpleJekyllSearch({
  searchInput: document.getElementById('searchInput'),
  resultsContainer: document.getElementById('resultsContainer'),
  json: '/search.json',
  searchResultTemplate: template
});

