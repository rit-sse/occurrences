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
          res.status(201).send(committee);
        })
        .catch(function(err){
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(function(req, res, next) {
      req.models
        .committee
        .findOne(req.params.id)
        .then(function(committee){
          if(!committee) {
            next({
              status: 404,
              message: 'Committee with id ' + req.params.id + ' not found'
            });
          } else {
            res.send(committee);
          }
        });
    })
    .put(function(req, res, next) {
      req.models
        .committee
        .update(req.params.id, req.body.committee)
        .then(function(committee){
          res.send(committee);
        })
        .catch(function(err){
          err.status = 422;
          next(err);
        });
    })
    .delete(function(req, res, next) {
      req.models
        .committee
        .destroy(req.params.id)
        .then(function(){
          res.status(204).send();
        })
    });

module.exports = router;
