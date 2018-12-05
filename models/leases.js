module.exports = function(sequelize, DataTypes) {
  const lease = sequelize.define("lease", {
    leasename:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    binaryfile: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    signdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updateddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });

  return lease;
};