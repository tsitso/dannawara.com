User = require('../models/user.js');
/*
 * GET users listing.
 */

module.exports = {
  profile: function(req, res){
    User.findOne({'_id': req.params.id}).populate('groups').exec(function(err,user){
      if(!user){res.redirect('/');}
      else if(req.user.id != user.id){ 
        res.send({'error': 'not allowed'});
        return;
      }
      res.render('layout',{
          values: {
            user: user
          }
        , partials: {
          content: '{{>users/profile}}'
        }
      });
    });
  }
, findOne: function(req, res){
  User.findOne({'_id': auth.userId},function(err,user){
    user[column] = data.id;
    if(!user.email){user.email = data.email}
    user.save();
    return promise.fulfill(user);
  })
}
, update: function(req, res){
    User.find({'_id': req.body.id},function(err,user){
      
    });
  }
, logout: function(req, res){
    req.logout();
    res.redirect('/');
  }
}
