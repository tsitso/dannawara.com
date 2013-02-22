var should = require('should')
  , request = require('supertest')
  , app = require('../app.js')
  , UserController = require('../controllers/users.js');

describe('User controller', function(){
  it('should return a profile',function(done){
    request(app)
      .get('/profiles/50ff0de1854a04bf68000002')
      .expect(500)
      .end(function(err, res){
              console.dir(err)
              console.dir(res)
                    done();
            });
  });
});
