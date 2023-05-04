// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { moviesCollections, db } from "../../../db/index";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      let results = moviesCollections.find({});
      const array = await results.toArray();
      res.status(200).json(array);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "not signed in" });
  }
  res.end();
}
