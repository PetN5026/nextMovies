import { ObjectId } from "mongodb";
import { reviewCollections } from "../../../../db/index";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { reviewId } = req.query;
  // console.log(reviewId);
  if (session) {
    if (req.method === "DELETE") {
      try {
        const doc = {
          _id: new ObjectId(reviewId),
        };

        const result = await reviewCollections.deleteOne(doc);
        res.status(200).json(result);
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
