/**
 * @description Service class for users, contains crud operations for user data.
 */
const user = {};
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
  const academicInfo = await db.academic.findAll({ where: { user_id: userId } })
  const employementInfo = await db.employement.findAll({ where: { user_id: userId } })
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
user.addUser = async function (basicInfo, academicInfo, employementInfo) {
  const user = await db.user.create({
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email
  })
  const userId = user?.dataValues?.id
  academicInfo.map(async _a => {
    await db.academic.create({
      user_id: userId,
      type: _a.type,
      institute: _a.institute,
      passingYear: _a.passingYear
    })
  })
  employementInfo.map(async _e => {
    await db.employement.create({
      user_id: userId,
      employeeCode: _e.employeeCode,
      companyName: _e.companyName,
      designation: _e.designation
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
user.updateUser = async function (basicInfo, academicInfo, employementInfo) {
  const userId = basicInfo?.id
  await db.user.update({
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email
  }, { where: { id: userId } })
  academicInfo.map(async _a => {
    if (_a.id) {
      await db.academic.update({
        type: _a.type,
        institute: _a.institute,
        passingYear: _a.passingYear
      }, { where: { id: _a.id } })
    } else {
      await db.academic.create({
        user_id: userId,
        type: _a.type,
        institute: _a.institute,
        passingYear: _a.passingYear
      })
    }
  })
  employementInfo.map(async _e => {
    if (_e.id) {
      await db.employement.update({
        employeeCode: _e.employeeCode,
        companyName: _e.companyName,
        designation: _e.designation
      }, { where: { id: _e.id } })
    } else {
      await db.employement.create({
        user_id: userId,
        employeeCode: _e.employeeCode,
        companyName: _e.companyName,
        designation: _e.designation
      })
    }
  })
  return {
    id: userId,
  }
}
module.exports = user;