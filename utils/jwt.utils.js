// imports
var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'ducpdpp4sup2leuvbtpugd8stlbf1sitfdvdpc7vvaplnditd0'

// exported functions
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            num_rna: userData.num_rna,
            nom_asso: userData.nom_asso,
            isAdmin: userData.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '24h'
            })
    },
    parseAuthorization: (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getAssociationNum_rna: (authorization) => {
        var associationNum_rna = 'W0';
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token,JWT_SIGN_SECRET);
                console.log('truc',jwtToken);
                if (jwtToken != null)
                    associationNum_rna = jwtToken.num_rna
                console.log('machin',associationNum_rna,jwtToken.num_rna)
                
            } catch (err) { 
                console.log('tutu',err);
            }
        }
        return associationNum_rna; 
    }
}