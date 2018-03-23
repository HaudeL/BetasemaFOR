// imports
var express = require("express");
var assoCtrl = require("./routes/assoCtrl");

// router
exports.router = (function () {
    var apiRouter = express.Router();

    // Associations routes
    apiRouter.route('/association/register/').post(assoCtrl.register);
    apiRouter.route('/association/login/').post(assoCtrl.login);
    apiRouter.route('/association/asso/').get(assoCtrl.getUserProfile);
    return apiRouter;
})();