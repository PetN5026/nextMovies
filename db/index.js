//mongodb+srv://Banana:adedPJX82HbCIMta@cluster0.3gi7jtk.mongodb.net/test

import { MongoClient } from "mongodb";
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_PORT}/test`;

export const client = new MongoClient(uri);
export const db = client.db("movie-api-db");
export const moviesCollections = db.collection("movies");
export const reviewCollections = db.collection("reviews");
