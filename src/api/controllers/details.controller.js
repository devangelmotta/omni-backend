const httpStatus = require('http-status');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const queryDynamo = require("../models/details/get-details");
const { errorProcess, succesProcess } = require("../utils/default-responses");
const { getTokenAccess, getTokenId } = require("../utils/extract-token");
const setDetails = require("../models/details/set-detail");
const getKeys = require("../utils/get-keys");


/**
 * Create new report
 * @public
 */
exports.create = async (req, res, next) => {
  let tokenAccess = await getTokenAccess(req);
  let tokenId = await getTokenId(req);
  let body = await getKeys()

  function verifyTokenId(token) {
    try {

      if (body) {
        pems = {};
        var keys = body['keys'];
        for (var i = 0; i < keys.length; i++) {
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) { return res.json(errorProcess("Token inválido", false)) }
        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log('Invalid token');
          return res.json(errorProcess("Token inválido", false))
        }

        jwt.verify(token, pem, function (err, payload) {
          if (err) { return res.json(errorProcess("Token inválido", false)) }
          else {

            setDetails(req, res, payload.aud)
          }
        });
      } else {
        res.json(errorProcess("Imposible descargar credenciles de AWS", false))
      }
    } catch (error) {
      res.json(errorProcess("Error inesperado", false))
    }
  }

  try {

    if (body) {
      pems = {};
      var keys = body['keys'];
      for (var i = 0; i < keys.length; i++) {
        //Convert each key to PEM
        var key_id = keys[i].kid;
        var modulus = keys[i].n;
        var exponent = keys[i].e;
        var key_type = keys[i].kty;
        var jwk = { kty: key_type, n: modulus, e: exponent };
        var pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      //validate the token
      var decodedJwt = jwt.decode(tokenAccess, { complete: true });
      if (!decodedJwt) {

        return res.json(errorProcess("Token inválido", false))
      }

      var kid = decodedJwt.header.kid;
      var pem = pems[kid];
      if (!pem) {
        console.log('Invalid token');
        return res.json(errorProcess("Token inválido", false))
      }

      jwt.verify(tokenAccess, pem, function (err, payload) {
        if (err) {
          return res.json(errorProcess("Token inválido", false))
        } else {
          verifyTokenId(tokenId);
        }
      });
    } else {
      res.json(errorProcess("Imposible descargar credenciles de AWS", false))
    }
  } catch (error) {
    res.json(errorProcess("Error inesperado", false))
  }
};


/**
 * Get details list
 * @public
 */
exports.list = async (req, res, next) => {
  let tokenAccess = await getTokenAccess(req);
  let tokenId = await getTokenId(req);
  let body = await getKeys()
  const { lastKey } = req.body;

  function verifyTokenIdList(token) {
    try {

      if (body) {
        pems = {};
        var keys = body['keys'];
        for (var i = 0; i < keys.length; i++) {
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) { return res.json(errorProcess("Token inválido", false)) }
        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          return res.json(errorProcess("Token inválido", false))
        }

        jwt.verify(token, pem, function (err, payload) {
          if (err) { return res.json(errorProcess("Token inválido", false)) }
          else {
            return queryDynamo(res, payload.aud, lastKey);
          }
        });
      } else {
        res.json(errorProcess("Imposible descargar credenciles de AWS", false))
      }
    } catch (error) {
      res.json(errorProcess("Error inesperado", false))
    }
  }


  try {
    if (body) {
      pems = {};
      var keys = body['keys'];
      for (var i = 0; i < keys.length; i++) {
        //Convert each key to PEM
        var key_id = keys[i].kid;
        var modulus = keys[i].n;
        var exponent = keys[i].e;
        var key_type = keys[i].kty;
        var jwk = { kty: key_type, n: modulus, e: exponent };
        var pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      //validate the token
      var decodedJwt = jwt.decode(tokenAccess, { complete: true });
      if (!decodedJwt) {

        return res.json(errorProcess("Token inválido", false))
      }

      var kid = decodedJwt.header.kid;
      var pem = pems[kid];
      if (!pem) {
        console.log('Invalid token');
        return res.json(errorProcess("Token inválido", false))
      }

      jwt.verify(tokenAccess, pem, function (err, payload) {
        if (err) {
          return res.json(errorProcess("Token inválido", false))
        } else {
          verifyTokenIdList(tokenId);
        }
      });
    } else {
      res.json(errorProcess("Imposible descargar credenciles de AWS", false))
    }
  } catch (error) {
    res.json(errorProcess("Error inesperado", false))
  }
}












