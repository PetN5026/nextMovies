// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "../../db/index";
export default async function handler(req, res) {
  try {
    const db = client.db("movie-api-db");
    const movies = db.collection("movies");
    const query = { title: "Puss in Boots: The Last Wish" };

    let results = await movies.findOne(query);
    res.status(200).json(results);
  } catch (error) {}
}
