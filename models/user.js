var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , userSchema = new Schema({
      date: {type: Date, default: Date.now}
    , name: {type: String}
    , email: String
    , googleId: String
    , githubId: String
    , groups:  [{ type: Schema.Types.ObjectId, ref: 'Group' }]
    , salted_pass: String
  });
 
module.exports = mongoose.model('User', userSchema);
