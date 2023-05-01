import { moviesCollections } from "@/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { movieTitle, reviewId } = req.query;
  console.log(movieTitle, reviewId);
  if (req.method === "DELETE") {
    try {
      // const doc = {
      //   _id: new ObjectId(reviewId),
      // };
      // const result = await reviewCollections.deleteOne(doc);
      const filter = { title: movieTitle };
      const updateDoc = {
        $pull: {
          reviewIds: new ObjectId(reviewId),
        },
      };

      const results = await moviesCollections.updateOne(filter, updateDoc);

      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json({ error: "wrong method" });
  }
}
