'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'the name of the task is required'
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed'],
    default: 'pending'
  },
  created_at: Date,
  updated_at: Date
});

// on every update, change the date
TaskSchema.pre('update', function(next) {
  console.log("its heree");
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

module.exports = mongoose.model('Tasks', TaskSchema);
