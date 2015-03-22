var express = require('express');
var router = express.Router();

router
  .route('/')
    .get(function(req, res, next) {
      req.models
        .committee
        .find({})
        .then(function(committees){
          res.send(committees);
        })
        .catch(function(err){
          next(err)
        })
    })
    .post(function(req, res, next) {
      req.models
        .committee
        .create(req.body.committee)
        .then(function(committee){
          res.send(committee);
        })
        .catch(function(err){
          err.status = 422;
          next(err);
        })
    });

router
  .route('/:id')
    .get(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {

    });

module.exports = router;
