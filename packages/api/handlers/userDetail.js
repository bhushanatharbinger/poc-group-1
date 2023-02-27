const user = require("../common_layer/services/user");
const { res_200, res_400 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
    const userId = event.pathParameters.param;
    if(!userId)
    return res_400({
      message:"Invalid request, User id is missing the request"
    });
    const userDetails = await user.getUserDetails(userId);
    return res_200(userDetails);
};
  