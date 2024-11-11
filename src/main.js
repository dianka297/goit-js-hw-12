import serviceImage from './js/pixabay-api';
import renderGallery from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let pageNumber = 1;
const perPage = 15;
let tagValue = '';

const searchForm = document.querySelector('.search-form');
export const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.js-load-more');

searchForm.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  tagValue = event.currentTarget.elements.tag.value;
  if (tagValue.trim() === '') {
    iziToast.warning({
      title: 'Missing tags',
      message: 'Please enter a search tag!',
      closeOnClick: true,
    });
    return;
  }
  pageNumber = 1;
  loadMore.classList.replace('load-more-hidden', 'load-more');
  loader.style.display = 'block';

  try {
    const data = await serviceImage(tagValue, pageNumber, perPage);
    console.log(data);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No pictures found',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        timeout: 2500,
        closeOnClick: true,
      });
    } else {
      renderGallery(data.hits);

      if (data.totalHits > perPage * pageNumber) {
        loadMore.style.display = 'block';
      } else {
        loadMore.style.display = 'none';
        iziToast.show({
          class: 'toast',
          position: 'topRight',
          messageColor: 'white',
          message: `We're sorry, but you've reached the end of search results.`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      timeout: 2500,
      closeOnClick: true,
    });
  } finally {
    loader.style.display = 'none';
  }
  searchForm.reset();
}

async function onLoadMore() {
  loader.style.display = 'block';
  pageNumber += 1;
  try {
    const data = await serviceImage(tagValue, pageNumber, perPage);
    renderGallery(data.hits);
    console.log(gallery.lastElementChild);

    // const card = document.querySelector('.gallery-item');
    // const cardHeight = card.getBoundingClientRect().height;
    // window.scrollBy({
    //   left: 0,
    //   top: cardHeight * 3.36,
    //   behavior: 'smooth',
    // });
    const cardSize = gallery.lastElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardSize.top + cardSize.height * 1.5,
      behavior: 'smooth',
    });

    if (data.totalHits > perPage * pageNumber) {
      loadMore.style.display = 'block';
    } else {
      loadMore.style.display = 'none';
      iziToast.show({
        class: 'toast',
        position: 'topRight',
        messageColor: 'white',
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      timeout: 2500,
      closeOnClick: true,
    });
  } finally {
    loader.style.display = 'none';
  }
}