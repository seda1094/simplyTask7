const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  },
  priority:{
    type: Number,
    required: true
  },
  deadline: {
    type: Date, required: true
  },
  expire: {
    type: Boolean,
    default: false
  }
})
taskSchema.methods.checkExpiredDeadlines = async function () {
  let date = Date.now();
  try {
    const exptasks = await this.model('Task').find({ "deadline": { $lt: date } })
    await exptasks.map(exptask => {
      Object.assign(exptask, {
        expire: true,
      })
      exptask.save()
    })
  } catch (error) {
    console.log(error)
  }


}
module.exports = model('Task', taskSchema)