// imports
var express = require("express");
var assoCtrl = require("./routes/assoCtrl");

// router
exports.router = (function () {
    var apiRouter = express.Router();

    // Routes Associations 
    apiRouter.route('/association/register/').post(assoCtrl.register);
    apiRouter.route('/association/login/').post(assoCtrl.login);
    apiRouter.route('/association/asso/').get(assoCtrl.getUserProfile);
    apiRouter.route('/association/rna/').put(assoCtrl.updateUserProfile);
    apiRouter.route('/association/forgot_password').get(assoCtrl.updateUserProfile);
   // apiRouter.route('/association/forgot_password') .post(assoCtrl.forgot_password);
    // Routes Matériel

    // Routes Echanges

    // Routes Périodes indisponibilité

    // Routes Périodes échange

    return apiRouter;
})();