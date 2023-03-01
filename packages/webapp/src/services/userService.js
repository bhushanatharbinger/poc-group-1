import http from "../utils/http";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/user/${id}`);
};

const create = data => {
  return http.post("/user", data);
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/${id}`);
};


const userService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default userService;