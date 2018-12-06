module.exports = function(sequelize, DataTypes) {
  const lease = sequelize.define("lease", {
    leasename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    binaryfile: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
    signdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  lease.associate = function(models) {
    lease.belongsTo(models.property, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  lease.associate = function(models) {
    lease.belongsTo(models.tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  lease.associate = function(models) {
    lease.hasMany(models.payment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return lease;
};
