// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { moviesCollections } from "../../../db/index";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const result = await moviesCollections.insertOne(req.body);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({ error: "wrong verb" });
  }
}
