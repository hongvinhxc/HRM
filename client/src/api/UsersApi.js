import BaseApi from "./BaseApi";

export default class extends BaseApi {
  getAll = async () => {
    try {
      let urlBase = this.makeUrl("proxys");
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id = "") => {
    try {
      let urlBase = this.makeUrl("proxys", id.toString());
      let result = await this.execute_get(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id = "") => {
    try {
      let urlBase = this.makeUrl("proxys", id.toString());
      let result = await this.execute_delete(urlBase);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  add = async (model) => {
    try {
      let urlBase = this.makeUrl("proxys");
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, model) => {
    try {
      let urlBase = this.makeUrl("proxys", id);
      let result = await this.execute_patch(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  deleteMany = async (model) => {
    try {
      let urlBase = this.makeUrl("proxys", 'delete-many');
      let result = await this.execute_post(urlBase, model);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

}
