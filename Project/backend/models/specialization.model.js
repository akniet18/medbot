const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specializationSchema = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},{timestamps:true,
})

const Specialization = mongoose.model('specialization',specializationSchema, 'specialization');

module.exports = Specialization;