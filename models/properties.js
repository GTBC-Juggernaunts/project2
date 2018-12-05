module.exports = function(sequelize, DataTypes) {
  const property = sequelize.define("property", {
    address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    rent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

  });

  property.associate = function(models) {
    property.belongsTo(models.landlord, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  property.associate = function(models) {
    property.hasMany(models.lease, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  property.associate = function(models) {
    property.hasMany(models.maintenance, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return property;
};