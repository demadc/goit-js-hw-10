import axios from 'axios';
import { BASE_URL } from './config';

export function fetchBreeds() {
  return axios(`${BASE_URL}/breeds`).then(({ status, data }) => {
    if (status !== 200) {
      throw new Error(error);
    }

    return data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(
    ({ status, statusText, data }) => {
      if (status !== 200) {
        throw new Error(statusText);
      }

      return data;
    }
  );
}
