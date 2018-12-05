module.exports = function(sequelize, DataTypes) {
  const bridge = sequelize.define("bridge", {
    //I don't think we need anything here as it is all foreign keys
  });

  bridge.associate = function(models) {
    bridge.belongsTo(models.property, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  bridge.associate = function(models) {
    bridge.belongsTo(models.user, {
      foreignKey: {
        as: 'tenant',
        allowNull: false
      }
    });
  };

  bridge.associate = function(models) {
    bridge.belongsTo(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return bridge;
};