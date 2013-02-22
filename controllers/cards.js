var Card  = require('../models/card.js')
  , Module  = require('../models/module.js')
  , mongoose = require('mongoose')
  , md = require('marked')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId


  var parseModules = function(card, cb){
    card.modules.forEach(function(module,i){
      card.modules[i].content = md(module.content)
    })
    cb(card)
  };
  var checkModules = function(modules,card, cb){
    modules.forEach(function(module,i){
      card.modules.forEach(function(cardModule){
        if(module.name == cardModule.name){
          modules[i].checked=true;
        }
      });
    });
    cb(modules);
  }

module.exports = {
  index: function(req, res){
    var cards = Card.find(function(err,cards){
      if(err){docs = err}
          res.render('layout',{
            values:{
              user: req.user
            , cards: cards }
          , partials:{ 
              content: '{{>cards/index}}' }
          });
    });
  }
, show: function(req,res){
    Card.findOne({name: req.params.id}).populate('modules').exec(function(err, card){
        if(err || card == null){ 
          res.redirect('/');
          return;
        }
        var parsedCard = parseModules(card,function(card){
          card.content = md(card.content)
          res.render('layout',{
            values:{
              user: req.user
            , card: card }
          , partials:{ 
              content: '{{>cards/show}}' }
          });
        });
    });
  }
, create:  function(req, res) {
    var card = new Card(req.body)
    card.save(function(err, data){
      if(err){
        res.send(err);
      }else{
        res.send(data, '\n', req.body);
      }
    });
  }
, update: function(req, res){
    Card.update({_id: req.body.id}, {$set: req.body}, function(err, card){
      if(err){
        res.send(err);
      }else{
        res.redirect('/cards/'+req.body.name)
      }
    });
  }
, edit: function(req, res){
    Module.find(function(err,modules){
      Card.findOne({name: req.params.id}).populate('modules').exec(function(err, card){
        checkModules( modules, card, function(mods){
          res.render('layout',{
            values:{
              card: card 
            , modules: mods
            }
          , partials:{ 
              content: '{{>cards/new}}' }
          });
        });
      });
    }); 
  }
, new: function(req, res){
    Module.find(function(err,modules){
      if(err){ throw err;}
      res.render('layout',{values:{modules: modules},partials: { content: '{{>cards/new}}'} })
    });
  }
}
