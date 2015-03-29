var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var ldap = require('ldapjs');

var env = process.env.NODE_ENV || 'development';

var keys = require('../helpers/keys');

var expiresIn = 60;

router
  .route('/')
    .post(function(req, res, next){
      function signAndSend(payload) {
        var response = jwt.sign(payload, keys.secret, {expiresInMinutes: 60, algorithm: 'RS256'});

        res.send({token: response, exp: new Date((new Date()).getTime() + expiresIn*60000) });
      }

      if( req.query.refresh) {
        var token;
        if (req.headers && req.headers.authorization) {
          var parts = req.headers.authorization.split(' ');
          if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
              token = credentials;
            }
          } else {
            return next({message: 'bad authorization header format', status: 401}); //bad format
          }
        }

        if (!token) {
          return next({message: 'couldn\'t find token in authorization header', status: 401}); //no token
        }

        jwt.verify(token, keys.pub, {algorithm: 'RS256'}, function(err, decoded) {
          if (err) {
            err.status = 401;
            return next(err);
          }
          signAndSend(decoded);
        });
      } else {
        var username = req.body.username.toLowerCase();
        var user = username + '@ad.sofse.org';
        var password = req.body.password;
        if((env === 'development' || env === 'test') && password === 'admin' && username === 'admin' ) {
          signAndSend({user: username});
        } else {
          var client = ldap.createClient({
            url: 'ldap://dc1.ad.sofse.org:389'
          });

          client.bind(user, password, function(err){
            if(err) {
              next({status: 401, message: 'Invalid Credentials'});
            } else {
              signAndSend({user: username});
            }
          });
        }
      }
    });

module.exports = router;
