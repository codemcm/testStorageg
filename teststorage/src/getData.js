import ConfigApi from './config';
const axios = require('axios');
async function getData() {
  return await axios({
    method: 'GET',
    url: ConfigApi.url + 'client/all/',
    responseType: 'text',
  }).then(function(response) {
    return response.data;
  });
}

export {getData};
