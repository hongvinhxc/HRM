var urlJoin = require("url-join");

export default class BaseApi {

  constructor() {
    this.baseUrl = '/api/'
  }

  makeUrl = (...args) => {
    return urlJoin(this.baseUrl, ...args);
  };

  call = async (url, method, model, noAuth) => {
    try {
      var token = localStorage.getItem("token");

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      if (noAuth) {
        headers.Authorization = undefined;
      }

      let request = {
        method: method,
        headers: headers,
      };

      if (method === "POST" || method === "PUT" || "PATCH") {
        request.body = JSON.stringify(model);
      }

      let response = await fetch(url, request);

      let responseJson = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }

      return responseJson;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  execute_get = async (url) => {
    return await this.call(url, "GET");
  };

  execute_post = async (url, model) => {
    return await this.call(url, "POST", model);
  };

  postWithoutToken = async (url, model) => {
    return await this.call(url, "POST", model, true);
  };

  execute_put = async (url, model) => {
    return await this.call(url, "PUT", model);
  };

  execute_patch = async (url, model) => {
    return await this.call(url, "PATCH", model);
  };

  execute_delete = async (url) => {
    return await this.call(url, "DELETE");
  };
}
