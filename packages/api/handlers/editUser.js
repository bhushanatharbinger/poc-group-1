const { updateUser } = require("../common_layer/services/user");
const { res_200 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
    const body = event.body;
    try{
      const user = await updateUser(body);
      return res_200({user});
    }catch(e){
      console.log(e);
    }
};