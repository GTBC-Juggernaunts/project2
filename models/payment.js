module.exports = function(sequelize, DataTypes) {
  const payment = sequelize.define("payment", {
    datedue:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentamt: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

  });

  property.associate = function(models) {
    property.belongsTo(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  property.associate = function(models) {
    property.belongsTo(models.paymentstatus, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return payment;
};