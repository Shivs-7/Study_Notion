const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
         required:true,
    },
    otp:{
     type:String,
     required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})


 // A function to send the emails
 async function sendVerificationEmail(){
    try{
         const mailresponse=await mailSender(email,"Verification Email from StudyNotion",otp);
         console.log("Email send Successfully:",mailresponse);
    }
    catch(error){
        console.log("Error orrcurs while sending the otp on mail",error);
        throw error;
    }
 }

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})




module.exprts=mongoose.model("OTP",OTPSchema);