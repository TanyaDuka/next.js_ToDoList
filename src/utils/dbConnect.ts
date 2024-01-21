import mongoose from "mongoose";

interface MongooseGlobal {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Not found MONGODB_URI environment variable inside .env");
}

const globalWithMongoose = global as unknown as MongooseGlobal;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    globalWithMongoose.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Mongoose connected to DB.");
        return mongoose.connection;
      });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from DB.");
    });
  }

  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
}

export default dbConnect;
