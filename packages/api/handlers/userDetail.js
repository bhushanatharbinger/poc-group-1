const user = require("../common_layer/services/user");
const { res_200, res_400,res_401 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
  const userId = event?.pathParameters?.param;
  if (!userId)
    return res_400({
      message: "Invalid request, User id is missing the request!"
    });
  const userDetails = await user.getUserDetails(userId);
  if (userDetails) {
    return res_200(userDetails);
  } else {
    return res_401({
      message: "Invalid User id!"
    });
  }
};
