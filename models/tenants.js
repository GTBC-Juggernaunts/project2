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
    tenant.hasMany(models.maintenance, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  tenant.associate = function(models) {
    tenant.hasMany(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  tenant.associate = function(models) {
    tenant.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return tenant;
};
