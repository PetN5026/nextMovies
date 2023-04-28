import { ObjectId } from "mongodb";
import { reviewCollections } from "../../../../db/index";
export default async function handler(req, res) {
  const { reviewId } = req.query;
  console.log(reviewId);
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
  }
}
