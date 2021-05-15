const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    photo:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    surname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    patronymic:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    experience:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    education:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    rating:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }, 
    address:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    first_visit_cost:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
    }, 
    second_visit_cost:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
    },
    timetable_days:{ type : Array , "default" : [] },
    specialization_ids:{ type : Array , "default" : [] },
    timetable_time:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password: { 
        type: String, 
        required: true 
    },
    calendar_id:{
        type: String, 
    }

},{timestamps:true,
})

doctorSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}
doctorSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const Doctor = mongoose.model('Doctor',doctorSchema, 'doctor');

module.exports = Doctor;