// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { moviesCollections, db } from "../../../db/index";
export default async function handler(req, res) {
  try {
    let results = moviesCollections.find({});
    const array = await results.toArray();
    console.log(array);
    res.status(200).json(array);
  } catch (error) {
    console.log(error);
  }
}
