var chai = require('chai');
var request = require('supertest');

var app = require('../../app.js');
var connectToDb = require('../helper');
var events = require('../fixtures/events');

var models = {};
var agent = request(app);
var expect = chai.expect;
var req;

describe('/api/events', function() {

  connectToDb(models);

  beforeEach(function(){
    app.models = models; //annoyance
    return app
      .models
      .committee
      .create({ name: 'committee' })
      .then(function(committee){
        var featured = app
          .models
          .event
          .create( new events.FeaturedEvent(committee));
        var unfeatured = app
          .models
          .event
          .create( new events.UnfeaturedEvent(committee));
        return Promise.all([featured, unfeatured]);
      });
  });

  describe('GET /', function() {
    context('when requesting past events', function(){
      beforeEach(function() {
        req = agent.get('/api/events?when=past')
      });

      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });

      it('should have the status 200', function(done) {
        req
          .expect(200, done);
      });
    });

    context('when requesting all events', function(){

    });

    context('when requesting future events', function(){

    });

    context('when start_date and end_date are present', function(){

    });

    context('when limit is present', function(){

    });

  });

  describe('POST /', function() {
  });

  describe('GET /:id', function() {
  });

  describe('PUT /:id', function() {
  });

  describe('DELETE /:id', function() {
  });
});
