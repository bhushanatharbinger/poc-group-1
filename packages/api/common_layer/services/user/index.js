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
  users.map((data) =>{
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
  
  return {
    "userId": "12aa1f62-d565-4053-90eb-54ba08ee2df5",
    "basicInfo": {
      "id": "12aa1f62-d565-4053-90eb-54ba08ee2df5 ",
      "firstName": "Wahid",
      "lastName": "Ali",
      "email": "wahid.ali@harbingergroup.com"
    },
    "academicInfo": [
      {
        "id": "12aa1f62-d565-4053-90eb-54ba08ee2df5 ",
        "type": "MCA",
        "institute": "Uttarakhand Technical University",
        "passingYear": "2013"
      }
    ],
    "employementInfo":
      [{
        "employeeCode": "1001",
        "companyName": "Harbinger Group",
        "designation": "Tech Lead"
      }
      ]
  };
}

/**
 * @description Method to create new user
 * @param {*} body | User information which is going to be created
 * @returns returns user id of newely created record
 */
user.addUser = async function (body) {
  const user = await db.user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email
  })
  return {
    id: user?.dataValues?.id,
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