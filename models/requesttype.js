module.exports = function(sequelize, DataTypes) {
  const requesttype = sequelize.define("requesttype", {
    type:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  requesttype.associate = function(models) {
    requesttype.hasMany(models.maintenance, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return requesttype;
};