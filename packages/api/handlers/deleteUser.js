const {deleteUser} = require("../common_layer/services/user");
const { res_201, res_400,res_401 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
  const userId = event?.pathParameters?.param;
  if (!userId)
    return res_400({
      message: "Invalid request, User id is missing the request!"
    });
  const userDetails = await deleteUser(userId);
  if (userDetails?.id) {
    return res_201(userDetails);
  } else {
    return res_401({
      message: "Invalid User id!"
    });
  }
};
