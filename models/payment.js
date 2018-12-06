module.exports = function(sequelize, DataTypes) {
  const payment = sequelize.define("payment", {
    datedue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    paymentamt: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  payment.associate = function(models) {
    payment.belongsTo(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  payment.associate = function(models) {
    payment.belongsTo(models.paymentstatus, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return payment;
};
