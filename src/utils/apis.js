import axios from 'axios';

const baseURL = 'https://fakeddit.onrender.com/api/';

export function getTenMostRecentArticles() {
  return axios
    .get(`https://fakeddit.onrender.com/api/articles/`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function getArticles(params) {
  let query = buildQueryString(params);
  console.log(baseURL + 'articles?');
  return axios
    .get(`${baseURL}articles?${query}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err, 'all articles'));
}

function buildQueryString(params) {
  return Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
