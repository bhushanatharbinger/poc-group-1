const { updateUser } = require("../common_layer/services/user");
const { res_400,res_201 } = require("../common_layer/util/CustomResponse");

module.exports.handler = async (event) => {
  if(!event?.body){
    return res_400({ message: "Invalid Data!" })
  }
  const body = JSON.parse(event?.body);
  const basicInfo = body?.basicInfo;
  const academicInfo = body?.academicInfo;
  const employementInfo = body?.employementInfo;
  try {
    if (typeof basicInfo?.firstName == "string" && typeof basicInfo?.lastName == "string" && typeof basicInfo?.email == "string") {
      const user = await updateUser(basicInfo,academicInfo,employementInfo);
      return res_201({ user });
    } else {
      return res_400({ message: "Invalid Data!" })
    }
  } catch (e) {
    console.log(e);
  }
};