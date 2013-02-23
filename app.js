var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , controllers = require('./lib/controllers.js')
  , mongoose = require('mongoose')
  , h4e = require('h4e')
  , http = require('http')
  , everyauth = require('everyauth')
  , path = require('path');


mongoose.connect('mongodb://nodejitsu:3992a14d0986e9b6953a970a91b78ff9@linus.mongohq.com:10098/nodejitsudb2758812075');

var app = express();

//Auth
require('./lib/auth.js').init(everyauth);

h4e.setup({ 
    app: app 
  , extension: 'hjs'
  , baseDir: __dirname+'/views'
  , toCompile: ['tests', 'js','header']
  });

app.configure(function(){
  app.set('port', process.env.PORT || 3848);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Scattered Clouds'));
  app.use(express.session({
      secret: 'egg mcMuffin'
  }));
  app.use(everyauth.middleware(app));
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/views/stylus'
  , dest: __dirname + '/public'
  , compile: function(str, path){
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
  }
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

//
//Routes
require('./lib/routes.js').r(app,controllers)

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;
