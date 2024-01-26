import { Schema, model } from 'mongoose';

const schema=Schema;

const userSchema = new schema({
    uname: {type:String , required:true},
    password: {type:String , required:true}
});

const User = model("User", userSchema);
export default  User;