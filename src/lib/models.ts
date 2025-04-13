import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    key:{
      type: String,
      required:true
    },
    loginToken: {
      type: String
    },
    isActive:{
      type:Number,
      required:true
    },
    isDown:{
      type:Number,
      required:true
    },
    isLoginProtected:{
      type:Number
    },
    uniqueId:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const keySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      max: 50,
    },
    validity:{
      type: Date,
      required: false,
    },
    isActive:{
      type:Number,
      required:true
    },
    deviceId:{
      type: Array,
      required:true
    },
    noDevices:{
      type:Number,
      required:true
    },
    period:{
      type:Number,
      required:true
    },
    game: {
      type: String,
      required: true,
      max: 50,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

const logSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      max: 50,
    },
    count: {
      type: new mongoose.Schema({
        total: { type: Number, required: true },
        success: { type: Number, required: true },
        failed: { type: Number, required: true },
        badRequest: { type: Number, required: true },
        noKey: { type: Number, required: true },
        isActiveFailed: { type: Number, required: true },
        isDownUser: { type: Number, required: true },
        inValidGame: { type: Number, required: true },
        maxDevice: { type: Number, required: true },
        expiredKey: { type: Number, required: true },
      }),
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Key = mongoose.models?.Key || mongoose.model("Key", keySchema);
export const Logs = mongoose.models?.logs || mongoose.model("Logs",logSchema );
