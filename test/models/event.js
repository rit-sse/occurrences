var chai = require('chai');
var expect = chai.expect;

var connectToDb = require('../helper');
var models = {};

var events = require('../fixtures/events');

describe('Event', function() {
  connectToDb(models);

  context('when everything is present', function(){
    it('should save', function(){
      var eventParams = new events.FeaturedEvent();
      var Event = models.event;
      var ePromise = Event.create(eventParams);

      return expect(ePromise).to.eventually.be.ok;
    });
  });

  describe('name', function() {
    context('when not present', function(){
      it('should not save', function(){
        var eventParams = new events.FeaturedEvent();
        eventParams.name = null;
        var Event = models.event;
        var ePromise = Event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('short_name', function() {
    context('when not present', function(){
      it('should not save');
    });

    context('when length is less than 1', function(){
      it('should not save');
    });

    context('when length is greater than 25', function(){
      it('should not save');
    });

    context('when length is between 1 and 25', function(){
      it('should save');
    });
  });

  describe('short_description', function() {
    context('when not present', function(){
      it('should save');
    });

    context('when length is less than 40', function(){
      it('should not save');
    });

    context('when length is greater than 70', function(){
      it('should not save');
    });

    context('when length is between 40 and 70', function(){
      it('should save');
    });
  });

  describe('featured', function() {
    context('when true', function() {
      context('when short_description is present and image is present', function() {
        it('should save');
      });

      context('image is not present', function() {
        it('should not save');
      });

      context('when short_description is not present', function() {
        it('should not save');
      });
    });

    context('when false', function() {
      context('when short_description is present and image is present', function() {
        it('should save');
      });

      context('image is not present', function() {
        it('should save');
      });

      context('when short_description is not present', function() {
        it('should save');
      });
    });
  });

  describe('start_date', function() {
    context('when not present', function(){
      it('should not save');
    });

    context('when start_date is before end_date', function() {
      it('should save');
    });

    context('when start_date is after end_date', function() {
      it('should not save');
    });
  });

  describe('end_date', function() {
    context('when not present', function(){
      it('should not save');
    });
  });

  describe('location', function() {
    context('when not present', function(){
      it('should not save');
    });
  });

  describe('committee', function() {
    context('when not present', function(){
      it('should not save');
    });
  });
});
