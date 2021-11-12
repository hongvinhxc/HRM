import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("roles");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id = "") => {
    try {
      let urlBase = this.makeUrl("roles", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id = "") => {
    try {
      let urlBase = this.makeUrl("roles", id.toString());
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("roles");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, model) => {
    try {
      let urlBase = this.makeUrl("roles", id);
      let result = await this.execute_patch(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  runAction = async (model) => {
    try {
      let urlBase = this.makeUrl("roles", "run-action");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  stopAction = async (model) => {
    try {
      let urlBase = this.makeUrl("roles", "stop-action");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getActionConfig = async () => {
    try {
      let urlBase = this.makeUrl("roles", "get-action-config");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
