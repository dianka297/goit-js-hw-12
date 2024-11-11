import axios from 'axios';

const API_KEY = '46861440-5100b639d37c0efc8464b7fe2';
const loader = document.querySelector('.loader');
const BASE_URL = 'https://pixabay.com/api/';

const perPage = 15;

export async function serviceImage(tag, page = 1) {
  loader.style.display = 'block';
  const { data } = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: tag,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: perPage,
    },
  }).finally(() => {
    loader.style.display = 'none';
  });

  return data;
}

export default serviceImage;