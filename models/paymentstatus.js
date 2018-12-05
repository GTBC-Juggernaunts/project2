module.exports = function(sequelize, DataTypes) {
  const paymentstatus = sequelize.define("paymentstatus", {
    status:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return paymentstatus;
};