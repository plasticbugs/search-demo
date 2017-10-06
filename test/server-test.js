const dotenv = require('dotenv');
dotenv.config();

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server-config');
var should = chai.should();

chai.use(chaiHttp);

describe('The search API', function() {
  it('should return a status code of 200 on /api/search?q=querystring GET', function(done) {
    chai.request(server)
      .get('/api/search?q=querystring')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  
  it('should return an array when searching /api/search?q=querystring GET', function(done) {
    chai.request(server)
      .get('/api/search?q=querystring')
      .end(function(err, res){
        res.body.should.be.an('array');
        done();
      });
  });
  
  it('should return a non-zero length array when searching for data contained in the db', function(done) {
    chai.request(server)
    .get('/api/search?q=new+york')
    .end(function(err, res){
      res.body.length.should.be.above(5);
      done();
    });
  });
  
  it('should handle searches (like néw+yørk) that have accents or non-standard characters', function(done) {
    chai.request(server)
    .get('/api/search?q=néw+yørk')
    .end(function(err, res){
      res.body.length.should.be.above(5);
      done();
    });
  });
  
  it('should handle searches for text in the db (like Beyoncé) that has accents or non-standard characters', function(done) {
    chai.request(server)
    .get('/api/search?q=beyonce')
    .end(function(err, res){
      res.body.length.should.be.above(5);
      done();
    });
  });
});