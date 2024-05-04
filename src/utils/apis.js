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
  return axios
    .get(`${baseURL}articles?${query}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err, 'all articles'));
}

export function getSingleArticle({ article_id }) {
  return axios
    .get(`${baseURL}articles/${article_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function getArticleComments({ article_id }, params) {
  let query = buildQueryString(params);
  return axios
    .get(`${baseURL}articles/${article_id}/comments?${query}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}


// HELPER FUNCTIONS
function buildQueryString(params) {
  return Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
