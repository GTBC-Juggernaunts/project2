module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isTenant: {
      type: DataTypes.BOOLEAN
    },
    isLandlord: {
      type: DataTypes.BOOLEAN
    },
    last_update: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false
    }
  });

  user.associate = function(models) {
    user.belongsTo(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  user.associate = function(models) {
    user.hasMany(models.property, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  user.associate = function(models) {
    user.hasMany(models.maintenance, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return user;
};
