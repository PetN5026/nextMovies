import { moviesCollections } from "@/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { movieTitle, reviewId } = req.query;
  console.log(movieTitle, reviewId);
  if (session) {
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
  } else {
    res.status(401).json({ message: "not signed in" });
  }

  res.end();
}
