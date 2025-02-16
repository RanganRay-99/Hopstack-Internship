const axios = require('axios').default;

const username = 'testaccount@test.com';
const password = '123456';
const headers = { "Authorization": `Basic ${Buffer.from(username + ":" + password).toString("base64")}` }

class Service {
  constructor() {
    let service = axios.create({
      headers
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    switch (error.response.status) {
      case 401:
        console.log('401');
        break;
      case 404:
        console.log('404');
        break;
      default:
        console.log("500");
        break;
    }
    return Promise.reject(error)
  }

  get(path, params, callback) {
    return this.service.get(path, { params }).then(
      (response) => callback(response.status, response.data)
    );
  }

  patch(path, payload, callback) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }
}

module.exports = Service;