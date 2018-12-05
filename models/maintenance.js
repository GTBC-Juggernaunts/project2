module.exports = function(sequelize, DataTypes) {
  const maintenance = sequelize.define("maintenance", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  maintenance.associate = function (models) {
    maintenance.belongsTo(models.landlord, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  maintenance.associate = function (models) {
    maintenance.belongsTo(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  maintenance.associate = function (models) {
    maintenance.belongsTo(models.requesttype, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return maintenance;
};