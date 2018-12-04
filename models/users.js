module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("user", {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    istennant: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultvalue: false
    },
    islandlord: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultvalue: false
    },
    createdtimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultvalue: false,
    },
    lastupdatedtimestamp: {
      type: DateTypes.DATE,
      allowNull: false,
      defaultvalue: false,
    }

  });

  return user;
};