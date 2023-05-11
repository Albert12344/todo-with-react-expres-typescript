import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todos:{
        type: String,
        required: true,
    },  
    index:{
        type: Number,
        required: true,
    },
})

const todoCollection = mongoose.model('todo', todoSchema)


module.exports = todoCollection
