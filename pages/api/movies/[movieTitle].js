// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { moviesCollections } from "../../../db/index";
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
    console.log("here");
    res.status(401).json({ message: "not signed in" });
    res.end();
  }
}
