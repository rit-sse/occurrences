var chai = require('chai');
var request = require('supertest');

var app = require('../../app.js');
var connectToDb = require('../helper');

var models = {};
var agent = request(app);
var expect = chai.expect;
var req;

describe('/api/committtees', function() {

  connectToDb(models);

  beforeEach(function(){
    return models
      .committee
      .create({ name: 'committee' });
  });

  describe('GET /', function() {
    before(function() {
      req = agent.get('/api/committees');
    });
    it('should respond with json');
    it('should have the status 200');
    it('should be of length 1');
  });

  describe('POST /', function() {
    context('when paramters are valid', function() {
      before(function() {
        req = agent
          .post('/api/committees')
          .send({ name: 'events'});
      });

      it('should respond with json');
      it('should have the status 201');
      it('should persist an item');
    });

    context('when paramters are not valid', function() {
      before(function() {
        req = agent
          .post('/api/committees')
          .send();
      });
      it('should respond with json');
      it('should have the status 422');
      it('should not persist an item');
    });
  });

  describe('GET /:id', function() {
    context('when paramters are valid', function() {
      before(function() {
        req = agent
          .get('/api/committees/1')
      });

      it('should respond with json');
      it('should have the status 201');
      it('should have the id of 1');
    });

    context('when paramters are valid', function() {
      before(function() {
        req = agent
          .get('/api/committees/2')
      });

      it('should respond with json');
      it('should have the status 404');
    });
  });

  describe('PUT /:id', function() {

    context('when paramters are valid', function() {
      before(function() {
        req = agent
          .put('/api/committees/1')
          .send({ name: 'events'});
      });

      it('should respond with json');
      it('should have the status 200');
      it('should update the item');
    });

    context('when paramters are not valid', function() {
      before(function() {
        req = agent
          .put('/api/committees/1')
          .send();
      });
      it('should respond with json');
      it('should have the status 422');
      it('should not update the item');
    });
  });

  describe('DELETE /:id', function() {

    before(function() {
      req = agent.delete('/api/committees/1');
    });

    it('should have status 204');
  });
});
