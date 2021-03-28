/* Search Config */
let template = `<div class="blog-card hex-dark">
  <img src="{image}" alt="Blog | {title}" title="Blog | {title}" class="blog-card__image">
  <div class="blog-card__content">
    <div class="blog-card__heading">
      <h6 class="blog-card__date hex-gray">{date}</h6>
      <h5 class="hex-white">{title}</h5>
    </div>

    <p class="blog-card__desc">{excerpt}
    </p>

    <a href="{url}" class="blog-card__link hex-tertiary" title="{title}" >Read more <i class="fas fa-arrow-right"></i></a>
  </div>
</div>`;

const searchInput = document.querySelector('#search-input');
const defaultResults = document.querySelector('#defaultResults');
const pager = document.querySelector('#pager');
const blogResults = document.querySelector('#blogResults');

searchInput.addEventListener('keyup', (e) => {
  if (searchInput.value) {
    defaultResults.classList.add('d-none');
    pager.classList.add('d-none');
    blogResults.classList.add('d-none');
  } else {
    defaultResults.classList.remove('d-none');
    pager.classList.remove('d-none');
    blogResults.classList.remove('d-none');
  }
});

SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  searchResultTemplate: template
});