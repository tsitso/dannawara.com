var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , moduleSchema = new Schema({
      date: {type: Date, default: Date.now}
    , name: {type: String}
    , content: { type: String }
    , current_status: { type: Number, default: 0}
  });
 
module.exports = mongoose.model('Module', moduleSchema);
