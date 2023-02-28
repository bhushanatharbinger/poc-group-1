const newUserBody = {
  "basicInfo": {
    "firstName": "Jest",
    "lastName": "test",
    "email": "JestTest@gmail.com"
  },
  "academicInfo": [
    {
      "type": "education type",
      "institute": "institute name",
      "passingYear": "Passing year"
    }
  ],
  "employementInfo": [
    {
      "employeeCode": "Employee Code",
      "companyName": "Company Name",
      "designation": "Designation"
    }
  ]
}
const editUserBody = {
  "basicInfo": {
    "id":12,
    "firstName": "Jest",
    "lastName": "test",
    "email": "JestTest_edit@gmail.com"
  },
  "academicInfo": [
    {
      "type": "education type",
      "institute": "institute name",
      "passingYear": "Passing year"
    }
  ],
  "employementInfo": [
    {
      "employeeCode": "Employee Code",
      "companyName": "Company Name",
      "designation": "Designation"
    }
  ]
}
const userId = 12;

module.exports = { newUserBody, editUserBody,userId }