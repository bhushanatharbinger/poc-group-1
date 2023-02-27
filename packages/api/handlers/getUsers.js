const user = require('../common_layer/services/user');
const userService = require('../common_layer/services/user');
const customResponse = require('../common_layer/util/CustomResponse');
module.exports.handler = async (event) => {
   const users = await userService.getUsers();
  return customResponse.res_200({users});
};
