const { addUser } = require("../common_layer/services/user");
const { res_201 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
    const body = event.body;
    try{
      const user = await addUser(body);
      return res_201({user});
    }catch(e){
      console.log(e);
    }
  };
  