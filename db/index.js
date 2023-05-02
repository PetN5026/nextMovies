import { MongoClient } from "mongodb";
export const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_PORT}/movie-api-db`;
export let client;
let clientPromise;
// export let client = new MongoClient(mongoURI);
let options = {};
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoURI, options);
    global._mongoClientPromise = client.connect();
  }
  client = new MongoClient(mongoURI, options);
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(mongoURI, options);
  clientPromise = client.connect();
}
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", client, clientPromise);
export const db = client.db("movie-api-db");
export const moviesCollections = db.collection("movies");
export const reviewCollections = db.collection("reviews");
export default clientPromise;
