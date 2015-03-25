var chai = require('chai');
var request = require('supertest');

var app = require('../../app.js');
var connectToDb = require('../helper');

app.models = {};
var agent = request(app);
var expect = chai.expect;
var req;

describe('/api/committtees', function() {

  connectToDb(app.models);

  beforeEach(function(){
    return app
      .models
      .committee
      .create({ name: 'committee' });
  });

  describe('GET /', function() {
    beforeEach(function() {
      req = agent.get('/api/committees');
    });

    it('should respond with json', function(done) {
      req
        .expect('Content-Type', /json/, done);
    });
    it('should have the status 200', function(done) {
      req
        .expect(200, done);
    });
    it('should be of length 1', function(done) {
      req
        .expect(function(res){
          if(res.body.length !== 1){
            return "Length is incorrect";
          }
        })
        .end(done)
    });
  });

  describe('POST /', function() {
    context('when paramters are valid', function() {
      beforeEach(function() {
        req = agent
          .post('/api/committees')
          .send({ committee: { name: 'events' } });
      });

      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 201', function(done) {
        req
          .expect(201, done);
      });
      it('should persist an item', function(done) {
        req
          .expect(function(res){
            return app
              .models
              .committee
              .find({})
              .then(function(committees){
                if(committees.length !== 2) {
                  done(new Error("Length is incorrect"));
                } else {
                  done();
                }
              });
          })
          .end(function(){});
      });
    });

    context('when paramters are not valid', function() {
      beforeEach(function() {
        req = agent
          .post('/api/committees')
          .send({ committee: {} });
      });
      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 422', function(done) {
        req
          .expect(422, done);
      });
      it('should not persist an item', function(done) {
        req
          .expect(function(res){
            return app
              .models
              .committee
              .find({})
              .then(function(committees){
                if(committees.length !== 1) {
                  done(new Error("Length is incorrect"));
                } else {
                  done();
                }
              });
          })
          .end(function(){});
      });
    });
  });

  describe('GET /:id', function() {
    context('when paramters are valid', function() {
      beforeEach(function() {
        req = agent
          .get('/api/committees/1')
      });

      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 200', function(done) {
        req
          .expect(200, done);
      });
      it('should have the id of 1', function(done) {
        req
          .expect(function(res){
            if(res.body.id !== 1) {
              return "Wrong ID";
            }
          })
          .end(done);
      });
    });

    context('when paramters are valid', function() {
      beforeEach(function() {
        req = agent
          .get('/api/committees/2')
      });

      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 404', function(done) {
        req
          .expect(404, done);
      });
    });
  });

  describe('PUT /:id', function() {

    context('when paramters are valid', function() {
      beforeEach(function() {
        req = agent
          .put('/api/committees/1')
          .send({ committee: { name: 'events'} });
      });

      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 200', function(done) {
        req
          .expect(200, done);
      });
      it('should update the item', function(done) {
        req
          .expect(function(res){
            return app
              .models
              .committee
              .findOne(1)
              .then(function(committee){
                if(committee.name !== 'events') {
                  done(new Error("Committee name didn't update"));
                } else {
                  done();
                }
              });
          })
          .end(function(){});
      });
    });

    context('when paramters are not valid', function() {
      beforeEach(function() {
        req = agent
          .put('/api/committees/1')
          .send({ committee: { name: 'committee'}});
      });
      it('should respond with json', function(done) {
        req
          .expect('Content-Type', /json/, done);
      });
      it('should have the status 422', function(done){
        req
          .expect(422, done);
      });
    });
  });

  describe('DELETE /:id', function() {

    beforeEach(function() {
      req = agent.delete('/api/committees/1');
    });

    it('should have status 204', function(done) {
      req
        .expect(204, done);
    });

    it('should delete the committee', function(done) {
        req
          .expect(function(res){
            return app
              .models
              .committee
              .find({})
              .then(function(committees){
                if(committees.length !== 0) {
                  done(new Error("Length is incorrect"));
                } else {
                  done();
                }
              });
          })
          .end(function(){});
    });
  });
});
