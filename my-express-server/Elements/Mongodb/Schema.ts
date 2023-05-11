import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
    text:{
        type: String,
        required: true,
    },  
    status:{
        type: Boolean,
        default: false,
    },
})

const todoModel = mongoose.model('Todo', todoSchema)


export default todoModel
