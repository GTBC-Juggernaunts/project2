module.exports = function(sequelize, DataTypes) {
  const requesttype = sequelize.define("requesttype", {
    type:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return requesttype;
};