import axios from 'axios';

const baseURL = 'https://fakeddit.onrender.com/api/';

export function getTopics() {
  return axios.get(`${baseURL}topics/`).then(({ data }) => {
    return data;
  });
}

export function getArticles(params) {
  let query = buildQueryString(params);
  return axios.get(`${baseURL}articles?${query}`).then(({ data }) => {
    return data;
  });
}

export function getSingleArticle({ article_id }) {
  return axios.get(`${baseURL}articles/${article_id}`).then(({ data }) => {
    return data;
  });
}

export function getArticleComments({ article_id }, params) {
  let query = buildQueryString(params);
  return axios
    .get(`${baseURL}articles/${article_id}/comments?${query}`)
    .then(({ data }) => {
      return data;
    });
}

export function patchArticleByID(article_id, voteChange) {
  const patchBody = { article_id: article_id, inc_votes: voteChange };
  return axios
    .patch(`${baseURL}articles/${article_id}`, patchBody)
    .then(({ data }) => {
      return data;
    });
}

export function postArticleComment({ article_id }, body) {
  return axios
    .post(`${baseURL}articles/${article_id}/comments`, body)
    .then(({ data }) => {
      return data;
    });
}

export function deleteArticleComment(comment_id) {
  return axios.delete(`${baseURL}comments/${comment_id}`).then(({ data }) => {
    return data;
  });
}

export function getUsers() {
  return axios.get(`${baseURL}users`).then(({ data }) => {
    return data;
  });
}

// HELPER FUNCTIONS
function buildQueryString(params) {
  return Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
