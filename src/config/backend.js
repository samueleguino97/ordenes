import {AsyncStorage} from 'react-native';

export function getAccessToken() {
  return AsyncStorage.getItem('access_token');
}

class Backend {
  constructor() {
    this.backendUrl = 'http://delivery-nube.com/api/v1';
    this.accessToken = null;
  }

  getImageURI(imageName) {
    return `http://delivery-nube.com/public/img/company_images/${imageName}`;
  }

  async request(endpoint = '', method = '', data = {}) {
    let requestUrl = `${this.backendUrl}/${endpoint}`;
    let headers = {};

    console.log(endpoint);
    const options = {};

    const accessToken = await getAccessToken();
    if (accessToken) {
      console.log(accessToken);
      data.access_token = accessToken;
    }

    if (method === 'GET') {
      options.method = method;

      requestUrl += '?';
      const queryParams = Object.keys(data).map(key => {
        return `${key}=${data[key]}`;
      });
      requestUrl += queryParams.join('&');
    }

    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
      options.headers = headers;
      options.method = method;
    }
    console.log(data);
    const requestResult = await fetch(requestUrl, options);
    console.log(requestResult);
    if (requestResult.status === 404) {
      let error = new Error();

      error = {...error, message: 'Endpoint not found'};
    }

    let resultContent = await requestResult.json();

    if (requestResult.status === 200) {
      return resultContent;
    } else {
      let error = new Error();

      error = {...error, ...resultContent};

      throw error;
    }
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }
}

const backend = new Backend();

export default backend;
