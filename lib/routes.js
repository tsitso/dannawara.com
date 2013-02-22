var isAuthenticated = function(req, res, next){
    if (!req.loggedIn) {
        req.session.redirectTo = req.url;
        return res.redirect('/');
      }
      next();
  };

module.exports = {
  r: function(app,controllers){
    app.get('/', controllers.Home.index);
    app.get('/logout', controllers.Users.logout);
    app.get('/cards/new', isAuthenticated, controllers.Cards.new);
    app.get('/cards', isAuthenticated, controllers.Cards.index);
    app.post('/cards', isAuthenticated, controllers.Cards.create );
    app.get('/cards/:id',controllers.Cards.show);
    app.get('/cards/edit/:id', isAuthenticated, controllers.Cards.edit);
    app.post('/cards/update', isAuthenticated, controllers.Cards.update );

    app.get('/modules', isAuthenticated, controllers.Modules.index);
    app.get('/modules/edit/:id', isAuthenticated, controllers.Modules.edit);
    app.get('/modules/new', isAuthenticated, controllers.Modules.new);
    app.post('/modules', isAuthenticated, controllers.Modules.create );
    app.post('/modules/update', isAuthenticated, controllers.Modules.update );
    app.get('/modules/destroy/:id', isAuthenticated, controllers.Modules.destroy );
    app.get('/:id', controllers.Cards.show);
  }
}
