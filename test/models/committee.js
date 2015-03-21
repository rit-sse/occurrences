var connectToDb = require('../helper')
var chai = require('chai');
var expect = chai.expect;
var models = {};

describe('Committee', function() {
  connectToDb(models);

  describe('name', function() {
    context('when unique', function(){
      it('should save', function(){
        var Committee = models.committee;
        var cPromise = Committee.create({ name: 'a name'});
        return expect(cPromise).to.eventually.be.ok;
      });
    });

    context('when not unique', function(){
      it('should not save', function(){
        var Committee = models.committee;
        var cPromise = Committee
          .create({ name: 'a name'})
          .then(function(){
            return Committee.create({ name: 'a name'})
          });
        return expect(cPromise).to.eventually.be.rejected;
      });
    });

    context('when not present', function(){
      it('should not save', function(){
        var Committee = models.committee;
        var cPromise = Committee.create({});
        return expect(cPromise).to.eventually.be.rejected;
      });
    });
  });
});
