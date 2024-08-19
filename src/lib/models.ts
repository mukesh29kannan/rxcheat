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
    isActive:{
      type:Number,
      required:true
    },
    isDown:{
      type:Number,
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Key = mongoose.models?.Key || mongoose.model("Key", keySchema);