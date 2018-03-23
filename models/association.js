'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Association = sequelize.define('association', {
    num_rna: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    nom_asso: {
      allowNull: false,
      type: Sequelize.STRING
    },
    adresse: {
      allowNull: false,
      type: Sequelize.STRING
    },
    code_postal: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    ville: {
      allowNull: false,
      type: Sequelize.STRING
    },
    nom_referent: {
      allowNull: false,
      type: Sequelize.STRING
    },
    prenom_referent: {
      allowNull: false,
      type: Sequelize.STRING
    },
    telephone: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    isAdmin: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    etat_valid: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  Association.associate = function (models) {
    // associations can be defined here
  };
  return Association;
};