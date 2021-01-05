const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        lowercase:true,
        min:3
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true,
        min:3
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
        min:3,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        min:3,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
})

// userSchema.virtual('password').set(function(password){
//     this.hashpassword=bcrypt.hashSync(password,10);
// });

// userSchema.methods={
//     authenticate: function(password){
//         return bcrypt.compare(req.body.password,this.hashpassword);
//     }
// }

module.exports=mongoose.model('users',userSchema)