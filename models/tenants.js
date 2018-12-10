module.exports = function(sequelize, DataTypes) {
  const tenant = sequelize.define("tenant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  tenant.associate = function(models) {
    tenant.hasMany(models.maintenancerequest, {
      foreignKey: "tenantId",
      as: "maintenancerequest"
    });

    tenant.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    tenant.hasMany(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return tenant;
};
