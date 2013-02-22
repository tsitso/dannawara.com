var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , cardSchema = new Schema({
      date: {type: Date, default: Date.now}
    , name: {type: String, unique: true }
    , content: { type: String }
    , modules: [{type: Schema.Types.ObjectId, ref: 'Module'}]
    , current_status: { type: Number, default: 0}
  });
 
module.exports = mongoose.model('Card', cardSchema);
