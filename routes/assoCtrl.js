// Imports
var bcrypt = require("bcrypt");
var jwtUtils = require("../utils/jwt.utils");
var models = require('../models');
var asyncLib = require('async');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
// routes
module.exports = {
    register: (req, res) => {
        //params
        var num_rna = req.body.num_rna;
        var nom_asso = req.body.nom_asso;
        var adresse = req.body.adresse;
        var code_postal = req.body.code_postal;
        var ville = req.body.ville;
        var nom_referent = req.body.nom_referent;
        var prenom_referent = req.body.prenom_referent;
        var telephone = req.body.telephone;
        var email = req.body.email;
        var password = req.body.password;

        //  la verification des parametres
        if (num_rna == null || nom_asso == null || adresse == null || code_postal == null || ville == null || nom_referent == null || prenom_referent == null || telephone == null || email == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        if (num_rna.length != 10) {
            return res.status(400).json({ 'error': 'num_rna doit contenir 10 caratères' });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'password invalid 4 à 8 caractères - 1 nombre min' });
        }

        models.association.findOne({
            attributes: ['num_rna'],
            where: { num_rna: num_rna }
        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 6, (err, bcryptedPassword) => {
                        var newUser = models.association.create({
                            num_rna: num_rna,
                            nom_asso: nom_asso,
                            adresse: adresse,
                            code_postal: code_postal,
                            ville: ville,
                            nom_referent: nom_referent,
                            prenom_referent: prenom_referent,
                            telephone: telephone,
                            email: email,
                            password: bcryptedPassword,
                            isAdmin: 0,
                            etat_valid: 0
                        })
                            .then(function (newUser) {
                                return res.status(201).json({ 'num_rna': newUser.num_rna })
                            })
                    })
                } else { return res.status(409).json({ 'error': 'user already exist' }); }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            })
    },

    login: (req, res) => {
        //params
        var num_rna = req.body.num_rna;
        var password = req.body.password;
        if (num_rna == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.association.findOne({
            where: { num_rna: num_rna }
        })
            .then(function (userFound) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'num_rna': userFound.num_rna,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        } else {
                            return res.status(403).json({ 'error': 'invalid password' }
                            )
                        };
                    })
                } else {
                    res.status(404).json({ 'error': 'user not exist in database' })
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            })

    },
    getUserProfile: (req, res) => {
        var headerAuth = req.headers['authorization'];
        var associationNum_rna = jwtUtils.getAssociationNum_rna(headerAuth);
        if (associationNum_rna == 'W0')
            return res.status(400).json({ 'error': 'wrong token' });

        models.association.findOne({
            attributes: ['num_rna', 'nom_asso'],
            where: { num_rna: associationNum_rna }
        }).then((association) => {
            if (association) {
                res.status(201).json(association);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch((err) => {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    },
    updateUserProfile: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var associationNum_rna = jwtUtils.getAssociationNum_rna(headerAuth);

        // Params
        var adresse = req.body.adresse;
        var code_postal = req.body.code_postal;
        var ville = req.body.ville;
        var nom_referent = req.body.nom_referent;
        var prenom_referent = req.body.prenom_referent;
        var telephone = req.body.telephone;
        var email = req.body.email;
        // var password = req.body.password;

        asyncLib.waterfall([
            function (done) {
                models.association.findOne({
                    attributes: ['num_rna', 'nom_asso', 'adresse', 'code_postal', 'ville', 'nom_referent', 'prenom_referent', 'telephone', 'email'],
                    where: { num_rna: associationNum_rna }
                }).then(function (userFound) {
                    done(null, userFound);
                })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    userFound.update({
                        adresse: (adresse ? adresse : userFound.adresse),
                        code_postal: (code_postal ? code_postal : userFound.code_postal),
                        ville: (ville ? ville : userFound.ville),
                        nom_referent: (nom_referent ? nom_referent : userFound.nom_referent),
                        prenom_referent: (prenom_referent ? prenom_referent : userFound.prenom_referent),
                        telephone: (telephone ? telephone : userFound.telephone),
                        email: (email ? email : userFound.email)
                    }).then(function () { done(userFound); })
                        .catch(function (err) {
                            res.status(500).json({ 'error': 'cannot update user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function (userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    }
}
