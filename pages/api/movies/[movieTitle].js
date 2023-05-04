// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth";
import { moviesCollections } from "../../../db/index";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const { movieTitle } = req.query;
      const query = { title: movieTitle };

      let results = await moviesCollections.findOne(query);

      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json("not signed in");
  }
  res.end();
}
