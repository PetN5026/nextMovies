// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { moviesCollections } from "../../../db/index";
export default async function handler(req, res) {
  try {
    const { movieTitle } = req.query;
    const query = { title: movieTitle };

    let results = await moviesCollections.findOne(query);

    res.status(200).json(results);
  } catch (error) {}
}
