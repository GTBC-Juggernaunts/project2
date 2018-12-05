module.exports = function(sequelize, DataTypes) {
  const paymentstatus = sequelize.define("paymentstatus", {
    status:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  paymentstatus.associate = function(models) {
    paymentstatus.hasMany(models.payment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return paymentstatus;
};