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
  const users = await db.user.findAll({ where: { deleted: false } })
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
  const existingUser = await db.user.findAll({ where: { email: basicInfo.email } })
  if (existingUser.length > 0) {
    return {
      error: 'Email Already Exist!'
    }
  }
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
    id: userId,
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email
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
  await db.academic.destroy({where:{user_id:userId},truncate: true})
  academicInfo.map(async _a => {
      await db.academic.create({
        user_id: userId,
        type: _a.type,
        institute: _a.institute,
        passingYear: _a.passingYear
      })
  })
  await db.employement.destroy({where:{user_id:userId},truncate: true})
  employementInfo.map(async _e => {
      await db.employement.create({
        user_id: userId,
        employeeCode: _e.employeeCode,
        companyName: _e.companyName,
        designation: _e.designation
      })
  })
  return {
    id: userId,
    firstName: basicInfo.firstName,
    lastName: basicInfo.lastName,
    email: basicInfo.email
  }
}

/**
 * @description Method to updated user
 * @param {*} body 
 * @returns return user id updated user record
 */
user.deleteUser = async function (userId) {
  const _user = await db.user.update({
    deleted: true
  }, { where: { id: userId } })
  if (_user?.[0] == 1) {
    return {
      id: userId
    }
  } else {
    return null
  }
}
module.exports = user;