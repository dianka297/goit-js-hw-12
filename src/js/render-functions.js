export const createGalleryMarkup = photos => {
    return photos
      .map(
        photo => `<li class="gallery-card">
    <a class="gallery-link" href="${photo.largeImageURL}">
      <img
        class="gallery-photo"
        src="${photo.webformatURL}"
        data-source="${photo.largeImageURL}"
        alt="${photo.tags}"
      />
    </a>
    <div class="under-img-info">
      <ul class="list-info">
        <li class="item-info">
          <h3 class="title-info">Likes</h3>
          <p class="text-info">${photo.likes}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Views</h3>
          <p class="text-info">${photo.views}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Comments</h3>
          <p class="text-info">${photo.comments}</p>
        </li>
        <li class="item-info">
          <h3 class="title-info">Downloads</h3>
          <p class="text-info">${photo.downloads}</p>
        </li>
      </ul>
    </div>
  </li>`
      )
      .join('');
  };