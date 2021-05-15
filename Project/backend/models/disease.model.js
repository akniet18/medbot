const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    symptom_list: { type : Array , "default" : [] },
    frequency:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    }
},{timestamps:true,
})

const Disease = mongoose.model('Disease',diseaseSchema);

module.exports = Disease;