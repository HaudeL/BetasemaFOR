'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Associations', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Associations');
  }
};