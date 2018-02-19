import superagent from 'superagent';

const apiRoot = 'https://panoptes-staging.zooniverse.org/api';

// Inspired by https://github.com/gothinkster/react-mobx-realworld-example-app/blob/master/src/agent.js
// and by previous similar work: https://github.com/zooniverse/edu-api-front-end/blob/master/src/lib/edu-api.js
// Edit to add superagent plugins like superagent-jsonapify

function get(endpoint, query) {
  const request = superagent.get(`${apiRoot}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1');

  if (query && query.length > 0) {
    query.forEach((obj) => {
      if (typeof obj === 'object') request.query(obj);
    });
  }

  return request.then(response => response.body);
}

function post(endpoint, data) {
  return superagent.post(`${apiRoot}${endpoint}`)
    .set('Content-Type', 'application/json')
    .send(data)
    .then(response => response);
}

function put(endpoint, data) {
  return superagent.put(`${apiRoot}${endpoint}`)
    .set('Content-Type', 'application/json')
    .send({ data })
    .then(response => response);
}

function del(endpoint) {
  return superagent.delete(`${apiRoot}${endpoint}`)
    .set('Content-Type', 'application/json')
    .then(response => response);
}

const requests = {
  get,
  post,
  put,
  del
};

export default requests;

window.exampleApiClient = requests;
