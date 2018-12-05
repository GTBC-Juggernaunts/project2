module.exports = function(sequelize, DataTypes) {
  const landlord = sequelize.define("landlord", {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

    landlord.associate = function(models) {
      landlord.belongsTo(models.tenant, {
        foreignKey: {
          allowNull: false
      }
    });
  };

  landlord.associate = function(models) {
    landlord.hasMany(models.property, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  landlord.associate = function(models) {
    landlord.hasMany(models.maintenance, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return landlord;
};