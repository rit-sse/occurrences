var chai = require('chai');
var expect = chai.expect;

var connectToDb = require('../helper');
var models = {};

var events = require('../fixtures/events');
var eventParams;
var committee;

var csv = require('../../helpers/csv')

describe('Event', function() {
  connectToDb(models);

  beforeEach(function(){
    return models
      .committee
      .create({ name: 'committee' })
      .then(function(c){
        committee = c.id;
      });
  })

  context('when everything is present', function(){
    it('featured should save', function(){
      eventParams = new events.FeaturedEvent(committee);
      var ePromise =  models
        .event
        .create(eventParams)

      return expect(ePromise).to.eventually.be.ok;
    });

    it('unfeatured should save', function(){
      eventParams = new events.UnfeaturedEvent(committee);
      var ePromise =  models.event.create(eventParams);

      return expect(ePromise).to.eventually.be.ok;
    });
  });

  describe('name', function() {
    context('when not present', function(){
      it('should not save', function(){
        eventParams = new events.FeaturedEvent(committee);
        eventParams.name = null;
        var ePromise =  models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('short_name', function() {
    beforeEach(function(){
      eventParams = new events.FeaturedEvent(committee);
    });

    context('when not present', function(){
      it('should not save', function() {
        eventParams.short_name = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });

    context('when length is less than 1', function(){
      it('should not save', function(){
        eventParams.short_name = '';
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });

    context('when length is greater than 25', function(){
      it('should not save', function(){
        eventParams.short_name = 'abcdefghijklmnopqrstuvwxyz';
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('short_description', function() {
    beforeEach(function(){
      eventParams = new events.UnfeaturedEvent(committee);
    });

    context('when not present', function() {
      it('should save', function() {
        eventParams.short_description = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.ok;
      });
    });

    context('when length is less than 40', function() {
      it('should not save', function() {
        eventParams.short_description = 'something';
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });

    context('when length is greater than 70', function(){
      it('should not save', function() {
        eventParams.short_description = 'This is an unnecessarily long short description. So long it is insane in the membrane. Neat party trick';
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('featured', function() {

    context('when true', function() {
      beforeEach(function(){
        eventParams = new events.FeaturedEvent(committee);
      });

      context('image is not present', function() {
        it('should not save', function() {
          eventParams.image = null;
          var ePromise = models.event.create(eventParams);

          return expect(ePromise).to.eventually.be.rejected;
        });
      });

      context('when short_description is not present', function() {
        it('should not save', function() {
          eventParams.short_description = null;
          var ePromise = models.event.create(eventParams);

          return expect(ePromise).to.eventually.be.rejected;
        });
      });
    });

    context('when false', function() {
      beforeEach(function(){
        eventParams = new events.UnfeaturedEvent(committee);
      });

      context('image is not present', function() {
        it('should save', function() {
          eventParams.image = null;
          var ePromise = models.event.create(eventParams);

          return expect(ePromise).to.eventually.be.ok;
        });
      });

      context('when short_description is not present', function() {
        it('should save', function() {
          eventParams.short_description = null;
          var ePromise = models.event.create(eventParams);

          return expect(ePromise).to.eventually.be.ok;
        });
      });
    });
  });

  describe('start_date', function() {
    beforeEach(function(){
      eventParams = new events.UnfeaturedEvent(committee);
    });

    context('when not present', function() {
      it('should not save', function() {
        eventParams.start_date = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });

    context('when start_date is after end_date', function() {
      it('should not save', function() {
        eventParams.start_date = new Date(2014, 3, 21, 14, 30);;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('end_date', function() {
    beforeEach(function(){
      eventParams = new events.UnfeaturedEvent(committee);
    });

    context('when not present', function() {
      it('should not save', function() {
        eventParams.end_date = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('location', function() {
    context('when not present', function() {
      it('should not save', function() {
        eventParams = new events.UnfeaturedEvent(committee);
        eventParams.location = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });

  describe('committee', function() {
    context('when not present', function() {
      it('should not save', function() {
        eventParams = new events.UnfeaturedEvent(committee);
        eventParams.location = null;
        var ePromise = models.event.create(eventParams);

        return expect(ePromise).to.eventually.be.rejected;
      });
    });
  });
});
