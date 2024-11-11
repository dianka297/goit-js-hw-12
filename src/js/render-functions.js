import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { gallery } from '../main';

const lightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
});

function renderGallery(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class='gallery-item' >
        <a href='${largeImageURL}' class="gallery-image">
          <img src='${webformatURL}' alt='${tags} '>
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            <h2 class="info-heading">Likes</h2>
            <p class="info-text">${likes}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Views</h2>
            <p class="info-text">${views}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Comments</h2>
            <p class="info-text">${comments}</p>
          </li>
          <li class="info-list-item">
            <h2 class="info-heading">Downloads</h2>
            <p class="info-text">${downloads}</p>
          </li>
        </ul>
      </li>
      `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export default renderGallery;