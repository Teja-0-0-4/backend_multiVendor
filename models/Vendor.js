//  define the schema

const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
});

const vendor = mongoose.model('Vendor',vendorSchema)

module.exports = vendor;