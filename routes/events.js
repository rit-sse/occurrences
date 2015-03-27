var express = require('express');
var router = express.Router();
var moment = require('moment');

var ical = require('../helpers/ical');
var csv = require('../helpers/csv');

router
  .route('/')
    .get(function(req, res, next) {
      var eventPromise;
      var groupEvents = function(events) {
        var weeks = {};
        return events.reduce(function(weeks, event){
          var week = moment(event.start_date).startOf('week').format('YYYY/MM/DD');
          if(!weeks[week]) {
            weeks[week] = [];
          }

          weeks[week].push(event);
          return weeks;
        }, {});
      };
      if(req.query.when === 'past') {
        eventsPromise = req
          .models
          .event
          .find({
            where: {
              start_date: {
                lessThan: new Date()
              }
            },
            sort: 'start_date DESC'
          })
          .then(groupEvents);
      } else if(req.query.when === 'all') {
        eventsPromise = req
          .models
          .event
          .find({
            sort: 'start_date DESC'
          })
          .then(groupEvents);
      } else if(req.query.when === 'future') {
        eventsPromise = req
          .models
          .event
          .find({
            where: {
              start_date: {
                greaterThanOrEqual: new Date()
              }
            },
            sort: 'start_date ASC'
          })
          .then(groupEvents);
      } else {
        if(!req.query.start_date || req.query.start_date === 'now') {
          req.query.start_date = new Date();
        }

        if(!req.query.limit) {
          req.query.limit = 1000;
        }

        if(!req.query.end_date) {
          eventsPromise = req
            .models
            .event
            .find({
              where: {
                start_date: {
                  greaterThanOrEqual: req.query.start_date,
                  lessThanOrEqual: req.query.end_date
                }
              },
              limit: req.query.limit,
              sort: 'start_date DESC'
            })
        } else {
          eventsPromise = req
            .models
            .event
            .find({
              where: {
                start_date: {
                  greaterThanOrEqual: req.query.start_date,
                  lessThanOrEqual: req.query.end_date
                }
              },
              limit: req.query.limit,
              sort: 'start_date DESC'
            });
        }
      }

      eventsPromise.then(function(events) {
        res.format({
          json: function(){
            res.send(events);
          },

          csv: function() {
            res.send(csv(events));
          },

          ics: function(){
            res.send(ical(events));
          },

          default: function() {
            next({status: 406, message: 'Not acceptable'});
          }
        });
      });
    })
    .post(function(req, res, next) {
      req.models
        .event
        .create(req.body.event)
        .then(function(event){
          res.status(201).send(event);
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
        .event
        .findOne(req.params.id)
        .then(function(event){
          if(!event) {
            next({
              status: 404,
              message: 'Event with id ' + req.params.id + ' not found'
            });
          } else {
            res.send(event);
          }
        });
    })
    .put(function(req, res, next) {
      req.models
        .event
        .update(req.params.id, req.body.event)
        .then(function(event){
          res.status(201).send(event);
        })
        .catch(function(err){
          err.status = 422;
          next(err);
        });
    })
    .delete(function(req, res, next) {
      req.models
        .event
        .destroy(req.params.id)
        .then(function(){
          res.status(204).send();
        })
    });

module.exports = router;
