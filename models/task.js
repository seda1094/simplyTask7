const {Schema, model} = require('mongoose')


const taskSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    instruction: {
      type: String,
      required: true
    },
    done:{
        type: Boolean,
        default: false
    }
  })
  module.exports = model('Task', taskSchema)