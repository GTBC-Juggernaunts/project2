module.exports = function(sequelize, DataTypes) {
  const maintenancerequest = sequelize.define("maintenancerequest", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  maintenancerequest.associate = function(models) {
    maintenancerequest.belongsTo(models.landlord, {
      foreignKey: {
        allowNull: false
      }
    });

    maintenancerequest.belongsTo(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });

    maintenancerequest.belongsTo(models.requesttype, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return maintenancerequest;
};
