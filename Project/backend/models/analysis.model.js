const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
},{timestamps:true,
})


const Analysis = mongoose.model('Analysis',analysisSchema);

module.exports = Analysis;