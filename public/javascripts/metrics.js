var ABC = ABC || {};

ABC.metrics = function(metrics){
  this.metrics = this.stringsToJSON(metrics);
}

ABC.metrics.prototype = {
  stringsToJSON: function(metrics){
    metrics.map(function(metric){
      metric.headers = JSON.parse(metric.headers);
      metric.data = JSON.parse(metric.data);
      return metric
    });
    return metrics;
  }
, isolateUsers: function(){
    var users = {};
    this.metrics.forEach(function(metric){
      if(!users[metric.user])
        users[metric.user] = [];
      users[metric.user].push(metric);
    });
    this.users = users;
  }
                
};

M = new ABC.metrics(metrics);
