// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { moviesCollections, reviewCollections } from "../../../db/index";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      try {
        const { movieTitle } = req.query;
        const query = { title: movieTitle };
        const options = {
          sort: { title: 1 },
        };
        let curserPointer = reviewCollections.find(query, options);
        const array = await curserPointer.toArray();
        // console.log(array);
        res.status(200).json(array);
      } catch (error) {
        console.log(error);
      }
    } else if (req.method === "POST") {
      try {
        const { movieTitle, reviewBody, userName, userEmail } = req.body;
        const doc = {
          title: movieTitle,
          review: reviewBody,
          userName,
          userEmail,
        };
        const result = await reviewCollections.insertOne(doc);
        const filter = { title: movieTitle };
        const updateDoc = {
          $push: {
            reviewIds: result.insertedId,
          },
        };
        let results = await moviesCollections.updateOne(filter, updateDoc);
        //will want to take result.insertedId and stuff it in the movie collection+
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
      }
    } else if (req.method == "DELETE") {
      try {
      } catch (error) {}
    } else {
      res.status(404).json({ error: "wrong action" });
    }
  } else {
    res.status(401).json({ message: "not signed in" });
  }
  res.end();
}
