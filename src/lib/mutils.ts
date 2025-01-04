import mongoose from "mongoose"

const connection:any = {};

export const connectToDb = async () => {
  try {
    if(connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect('mongodb+srv://root:admin@cluster0.cstyag8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    connection.isConnected = db.connections[0].readyState;
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};