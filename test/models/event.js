var chai = require('chai');
var expect = chai.expect;

describe('Event', function() {
  describe('name', function() {
    context('when present', function(){
      it('should save');
    });

    context('when not present', function(){
      it('should not save');
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
