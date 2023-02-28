const { addUser } = require("../common_layer/services/user");
const { res_201, res_400 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  try {
    if (typeof body?.firstName == "string" && typeof body?.lastName == "string" && typeof body?.email == "string") {
      const user = await addUser(body);
      return res_201({ user });
    } else {
      return res_400({ message: "Invalid Data!" })
    }
  } catch (e) {
    console.log(e);
  }
};
