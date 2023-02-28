'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employement.init({
    employeeCode: DataTypes.STRING,
    companyName: DataTypes.STRING,
    designation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employement',
  });
  return employement;
};