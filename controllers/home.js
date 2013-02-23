var Card = require('../models/card.js')
  , md = require('marked');

var parseModules = function(card, cb){
  card.modules.forEach(function(module,i){
    card.modules[i].content = md(module.content)
  })
  cb(card)
};

module.exports = {
  index: function(req, res){
    Card.findOne({}, {}, { sort: { 'created_at' : -1 } }).populate('modules').exec(function(err, card){
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
}
