module.exports = function(sequelize, DataTypes) {
  const maintenance = sequelize.define("maintenance", {
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  maintenance.associate = function(models) {

    maintenance.belongsTo(models.user, {
      foreignKey: {
        as: 'landlord',
        allowNull: false
      }
    });

    maintenance.belongsTo(models.user, {
      foreignKey: {
        as: 'tenant',
        allowNull: false
      }
    });
  };

  return maintenance;
};