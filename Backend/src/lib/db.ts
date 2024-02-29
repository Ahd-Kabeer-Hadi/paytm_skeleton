import { model, connect, Schema } from "mongoose";

const db = connect(
  "mongodb+srv://PaytmAdmin:F8xgZDRGvackdJsC@cluster0.zxtzcfo.mongodb.net/Paytm"
);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
 
});

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = model('Account', accountSchema);
const User = model("User", UserSchema);

export { User, Account };
