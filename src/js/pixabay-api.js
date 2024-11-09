import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
export let perPage = 15;

export const fetchFotosByQuery = async (searchQuery, page) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: '43952062-1ac9439355a7535a7f5f048fb',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
  // .then(response => response.data)
  // .catch(error => console.log(error));
};

// export const addMorePhotos = async (searchQuery, page) => {
//   try {
//     const photosData = await fetchFotosByQuery(searchQuery, page);
//     galleryEl.insertAdjacentHTML(
//       'beforeend',
//       createGalleryMarkup(photosData.hits)
//     );

//     lightbox.refresh();
//     page += 1;

//     if (photosData.totalHits === 0) {
//       iziToast.show({
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//         timeout: 4000,
//         pauseOnHover: true,
//         color: 'red',
//       });
//       loadMoreBtn.classList.add('is-hidden');
//       return;
//     }
//     loaderEl.classList.add('is-hidden');
//   } catch (error) {
//     console.log(error);
//   }
// };