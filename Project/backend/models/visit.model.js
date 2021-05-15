const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    user_id:{
        type:Number,
        required:true,
        // unique:true,
        // trim:true
    },
    doctor_id:{
        type:Number,
        // required:true,
        // unique:true,
        // trim:true
    },
    date_visit:{
        type:Date,
        // required:true,
        // unique:true,
        // trim:true
    },
    symptoms:{ type : Array , "default" : [] },
    predicted_diseases:{ type : Array , "default" : [] },
    list_of_analysis:{ type : Array , "default" : [] },
    patient_comment:{type:String},
    comment_befor_visit:{
        type:String,
        // required:true,
        // unique:true,
        // trim:true
    },
    recept:{
        type:String,
        // required:true,
        // unique:true,
        // trim:true
    },
    comment_after_visit:{
        type:String,
        // required:true,
        // unique:true,
        // trim:true
    },
    status:{
        type:String,
        default: "not confirmed",
        // required:true,
        // unique:true,
        // trim:true
    }

},{timestamps:true,
})

const Visit = mongoose.model('Visit',visitSchema, 'visit');

module.exports = Visit;