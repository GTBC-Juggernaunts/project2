module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  user.associate = function(models) {
    user.hasOne(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  user.associate = function(models) {
    user.hasOne(models.landlord, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return user;
};
