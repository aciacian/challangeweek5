'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment-timezone');
module.exports = (sequelize, DataTypes) => {
  class Car1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car1.init({
    nama:DataTypes.STRING,
    hargasewa:DataTypes.INTEGER,
    ukuran:DataTypes.STRING,
    urlfoto:DataTypes.STRING,
    createdate: {
      type: DataTypes.NOW,
      allowNull: false,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      field: 'createdate'
    },
    updatedate:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Car1',
    tableName: 'carlist',
    freezeTableName: true,
  });
  return Car1;
};