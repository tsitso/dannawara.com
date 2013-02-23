var Module  = require('../models/module.js')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

module.exports = {
  index: function(req, res){
    var modules = Module.find(function(err,modules){
      if(err){docs = err}
        res.render('layout',{
          values:{
            user: req.user
          , modules: modules }
        , partials:{ 
            content: '{{>modules/index}}' }
        });
    });
  }
, show: function(req,res){
    Module.findOne({_id: req.params.id},function(err, module){
        res.render('layout',{
          values:{
            module: module }
        , partials:{ 
            content: '{{>modules/show}}' }
        });
    });
  }
, create:  function(req, res) {
    var module = new Module(req.body)
    module.save(function(err, data){
      if(err){
        res.send(err);
      }else{
        res.redirect('/modules')
      }
    });
  }
, edit: function(req, res){
    Module.findOne({_id: req.params.id}, function(err,module){
      res.render('layout',{
        values:{
          module: module
        }
      , partials:{ 
          content: '{{>modules/new}}' }
      });
    }); 
  }
, update: function(req, res){
    Module.update({_id: req.body.id}, {$set: req.body}, function(err, card){
      if(err){
        res.send(err);
      }else{
        res.redirect('/modules')
      }
    });
  }
, destroy: function(req, res){
    Module.remove({_id: req.params.id}, function(err, data){
      if(err) throw err;
      res.redirect('/modules');
    });
  }
, new: function(req, res){
    res.render('layout',{values:{},partials: { content: '{{>modules/new}}'} })
  }
}
