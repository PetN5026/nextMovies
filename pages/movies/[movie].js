import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function SingleMovie({}) {
  const router = useRouter();
  const { movie } = router.query;
  const [single, setSingle] = useState({});
  const [reviews, setReviews] = useState({});
  // console.log(movie);
  console.log("single", single);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    async function ret() {
      console.log("movie", movie);
      const data = await fetch(`/api/movies/${movie}`);
      console.log("data", data);
      const one = await data.json();
      // console.log(one);
      const reviewData = await fetch(`/api/reviews/${movie}`);
      const reviewJson = await reviewData.json();
      console.log("reviewwwwwww", reviewJson);
      setSingle(one);
      setReviews(reviewJson);
      console.log("doneeeeeeeeeeeeeeeeeeee");
    }
    if (!single) {
    }
    ret();
  }, [router.isReady]);

  if (single) {
    return (
      <>
        <p>{movie}</p>
        {/* <ul>
        {reviews.map((review) => {
          return <li key={review._id}>{review.review}</li>;
        })}
      </ul> */}
        <img src={single.poster} />
      </>
    );
  } else {
    return <p>loading</p>;
  }
}
