const httpStatus = require('http-status');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const { succesProcess, errorProcess } = require("../utils/default-responses");
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const { getTokenAccess, getTokenId } = require("../utils/extract-token");
const getKeys = require("../utils/get-keys");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const { poolData, pool_region } = require("../../config/aws-config");
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
global.fetch = require('node-fetch');

/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
    userPool.signUp(email, password, attributeList, null, function (err, result) {
      if (err) {
        console.log(err);
        return res.json(errorProcess(err))
      }
      cognitoUser = result.user;
      console.log(cognitoUser);
      res.json(succesProcess("Usuario creado", cognitoUser))
    });
  } catch (error) {
    console.log(error)
    return res.json(errorProcess(error))

  }
};

exports.checkTokens = async (req, res, next) => {

  // let tokenAccess = await getTokenAccess(req);
  // let tokenId = await getTokenId(req);
  // let body = await getKeys()

  // function verifyTokenIdList(token) {
  //   try {

  //     if (body) {
  //       pems = {};
  //       var keys = body['keys'];
  //       for (var i = 0; i < keys.length; i++) {
  //         var key_id = keys[i].kid;
  //         var modulus = keys[i].n;
  //         var exponent = keys[i].e;
  //         var key_type = keys[i].kty;
  //         var jwk = { kty: key_type, n: modulus, e: exponent };
  //         var pem = jwkToPem(jwk);
  //         pems[key_id] = pem;
  //       }
  //       var decodedJwt = jwt.decode(token, { complete: true });
  //       if (!decodedJwt) { return res.json(errorProcess("Token inválido", false)) }
  //       var kid = decodedJwt.header.kid;
  //       var pem = pems[kid];
  //       if (!pem) {
  //         return res.json(errorProcess("Token inválido", false))
  //       }

  //       jwt.verify(token, pem, function (err, payload) {
  //         if (err) { return res.json(errorProcess("Token inválido", false)) }
  //         else {
  //           return succesProcess("Login alive", true)
  //         }
  //       });
  //     } else {
  //       res.json(errorProcess("Imposible descargar credenciles de AWS", false))
  //     }
  //   } catch (error) {
  //     res.json(errorProcess("Error inesperado", false))
  //   }
  // }


  // try {
  //   if (body) {
  //     pems = {};
  //     var keys = body['keys'];
  //     for (var i = 0; i < keys.length; i++) {
  //       //Convert each key to PEM
  //       var key_id = keys[i].kid;
  //       var modulus = keys[i].n;
  //       var exponent = keys[i].e;
  //       var key_type = keys[i].kty;
  //       var jwk = { kty: key_type, n: modulus, e: exponent };
  //       var pem = jwkToPem(jwk);
  //       pems[key_id] = pem;
  //     }
  //     //validate the token
  //     var decodedJwt = jwt.decode(tokenAccess, { complete: true });
  //     if (!decodedJwt) {

  //       return res.json(errorProcess("Token inválido", false))
  //     }

  //     var kid = decodedJwt.header.kid;
  //     var pem = pems[kid];
  //     if (!pem) {
  //       console.log('Invalid token');
  //       return res.json(errorProcess("Token inválido", false))
  //     }

  //     jwt.verify(tokenAccess, pem, function (err, payload) {
  //       if (err) {
  //         return res.json(errorProcess("Token inválido", false))
  //       } else {
  //         verifyTokenIdList(tokenId);
  //       }
  //     });
  //   } else {
  //     res.json(errorProcess("Imposible descargar credenciles de AWS", false))
  //   }
  // } catch (error) {
  //   res.json(errorProcess("Error inesperado", false))
  // }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password,
    });

    var userData = {
      Username: email,
      Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: function (result) {
        res.json(succesProcess("Usuario logueado", true, result))
      },
      onFailure: function (err) {
        console.log("Zona profunda OnFail", err)
        console.log("Fallo: onFailure");
        return res.json(errorProcess(err, false))
      },

    });
  } catch (error) {
    console.log("Fallo fallito fallo", error)
    return res.json(errorProcess(error))

  }
};



/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {

  } catch (error) {
    return next(error);
  }
};
