/**
 * @description Service class for users, contains crud operations for user data.
 */
const user = {};
const userRepository = require('../../repository/user')
const db = require('../../../models')
/**
 * @description Service method to return all users
 * @returns list of array
 */
user.getUsers = async function () {
  const users = await db.user.findAll()
  let _data = [];
  users.map((data) => {
    _data.push(data);
  })
  return _data;
};

/**
 * @description Method to retrive details of specific user
 * @param {*} userId | User id parameter to retrieve the details
 * @returns returns specific user details
 */
user.getUserDetails = async function (userId) {
  const basicInfo = await db.user.findByPk(userId)
  const academicInfo = await db.academic.findOne({ where: { user_id: userId } })
  const employementInfo = await db.employement.findOne({ where: { user_id: userId } })
  if (basicInfo) {
    return {
      "userId": basicInfo?.id,
      "basicInfo": basicInfo,
      "academicInfo": academicInfo,
      "employementInfo": employementInfo
    };
  } else {
    return null;
  }
}

/**
 * @description Method to create new user
 * @param {*} body | User information which is going to be created
 * @returns returns user id of newely created record
 */
user.addUser = async function (basicInfo,academicInfo,employementInfo) {

  const user = await db.user.create({
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email
  })
  const userId = user?.dataValues?.id
  academicInfo.map(async _a=>{
    await db.academic.create({
      user_id:userId,
      type:_a.type,
      institute:_a.institute,
      passingYear:_a.passingYear
    })
  })
  employementInfo.map(async _e=>{
    await db.employement.create({
      user_id:userId,
      employeeCode:_e.employeeCode,
      companyName:_e.companyName,
      designation:_e.designation
    })
  })
  return {
    id: userId
  }
}

/**
 * @description Method to updated user
 * @param {*} body 
 * @returns return user id updated user record
 */
user.updateUser = async function (body) {
  return {
    id: "12aa1f62-d565-4053-90eb-54ba08ee2df5",
  }
}
module.exports = user;