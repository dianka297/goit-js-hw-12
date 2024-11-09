import { fetchFotosByQuery, perPage } from './js/pixabay-api.js';
import { createGalleryMarkup } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery-list');
const searchFormEl = document.querySelector('.form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
let page = 1;
let searchQuery = '';
let totalPages = 0;
let lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchFormSubmit(event) {
  event.preventDefault();

  page = 1;

  searchQuery = event.target.elements.query.value.trim();

  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  try {
    const photosData = await fetchFotosByQuery(searchQuery);
    // console.log('🚀 ~ onSearchFormSubmit ~ photosData:', photosData);
    // console.log(photosData.totalHits);

    if (photosData.total === 0) {
      event.target.reset();
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000,
        pauseOnHover: true,
        color: 'red',
      });
      loaderEl.classList.add('is-hidden');
      loadMoreBtn.classList.add('is-hidden');
      return;
    }

    galleryEl.innerHTML = createGalleryMarkup(photosData.hits);
    lightbox.refresh();
    totalPages = Math.ceil(photosData.totalHits / perPage);
    console.log(totalPages);
    page += 1;
  } catch (error) {
    console.log(error);
  }
  // console.log(!(galleryEl.innerHTML === ''));
  // console.log(galleryEl.innerHTML);
  if (!(galleryEl.innerHTML === '')) {
    loadMoreBtn.classList.remove('is-hidden');
  }
  event.target.reset();
  loaderEl.classList.add('is-hidden');
}

const smoothScrollOnLoadMore = () => {
  const card = document.querySelector('.gallery-card');
  const cardHeight = card.getBoundingClientRect().height;
  const scrollHeight = cardHeight * 2;
  console.log(scrollHeight);

  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};

async function onLoadMoreBtnClick(event) {
  event.preventDefault();
  loadMoreBtn.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  try {
    const photosData = await fetchFotosByQuery(searchQuery, page);
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryMarkup(photosData.hits)
    );

    lightbox.refresh();
    page += 1;
    loadMoreBtn.classList.remove('is-hidden');

    loaderEl.classList.add('is-hidden');
    smoothScrollOnLoadMore();

    if (page > totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 4000,
        pauseOnHover: true,
        color: 'red',
      });
    }
  } catch (error) {
    console.log(error);
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);