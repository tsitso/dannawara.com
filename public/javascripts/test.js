var Test = Backbone.Model.extend({
      url: '/tests' 
    })
  , test = new Test()
  , Layer = Backbone.Model.extend({})
  , Layers = Backbone.Collection.extend({
      model:  Layer
    , url:    '/layers'
  });

var TestForm = Backbone.View.extend({
  el: "#test"
, tagName: 'form'
, model: test
, events: {
  'click #add': function(ev){
    var variants =  this.model.get('variants')
      , name =      $('#variant_name').val()
      , template =  $('#variant_template').val();

    if(name == "" || template == "") return false;
    if(variants){
      variants[variants.length] = {name: name, template: template}
    }else{
      variants = [];
      variants[0] = {name: $('#variant_name').val(), template: $('#variant_template').val()}
    }

    this.model.set({variants: variants});
    this.render();
  } 
, 'change #layer': function(){
    this.model.set({layer: $('#layer').val()});
  }
, 'change #name': function(){
    this.model.set({name: $('#name').val(), layer: $('#layer').val()});
  }
, 'change #buckets': function(){
    this.model.set({buckets: $('#buckets').val()});
  }
, 'click #submit': function(ev){
    ev.preventDefault();
    this.model.save({success: function(){alert('successfully saved')}});
  }
}
, render: function(){
    var template = Hogan.compile(this.template)
      , variants = this.model.get('variants')
      , layers = this.layers;
    this.$el.html(template.render({'layers': layers.toJSON(), variants: variants, name: this.model.get('name'), buckets: this.model.get('buckets')}));
  }
, initialize: function(){
    this.model.set({variants: []});
    var self = this;
    this.layers = new Layers();
    this.layers.fetch({success: function(){
      console.log('fetched');
      $.ajax('/template',{
        type: 'POST'
      , data: {template: '/views/tests/new.hjs'}
      , success: function(r,e){
        self.template = r;
        self.render();
      }
      });
    }});
  } 
});

//testForm = new TestForm();

var Tests = Backbone.Router.extend({
  routes: {
    'index': 'index'
  , 'new': 'new'
  }
, index: function(){
   this.view = new TestForm(); 
  }
, new: function(){
   this.view = new TestForm(); 
  }
});
