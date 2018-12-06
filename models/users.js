module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("user", {});


  user.associate = function (models) {
    user.hasOne(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  user.associate = function (models) {
    user.hasOne(models.landlord, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return user
};

