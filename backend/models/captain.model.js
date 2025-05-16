const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Firstname must be at least 3 characters long"],
            maxlength:50
        },
        lastname:{
            type:String,
            
            minlength:[3,"Lastname must be at least 3 characters long"],
            
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password must be at least 6 characters long"]
    },
    socketId:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
   vehicle:{
    color:{
        type:String,
        required:true,
        minlength:[3,"Color must be at least 3 characters long"],
    },
    plate:{
        type:String,
        required:true,
        minlength:[3,"Plate must be at least 3 characters long"],
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,"Capacity must be at least 1"],
        max:10
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['car','bike','auto']
    }
   },
   location:{
    lat:{
        type:Number,
    },
    lng:{
        type:Number,
    }
    }
   
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password,10);
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}       

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;





