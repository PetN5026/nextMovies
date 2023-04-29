import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function SingleMovie({}) {
  const router = useRouter();
  const { movie } = router.query;
  const [single, setSingle] = useState({});
  const [reviews, setReviews] = useState({});
  useEffect(() => {
    async function ret() {
      const data = await fetch(`/api/movies/${movie}`);
      console.log(data);
      const one = await data.json();
      console.log(one);
      const reviewData = await fetch(`/api/reviews/${movie}`);
      console.log(movie);
      const reviewJson = await reviewData.json();
      console.log("reviewwwwwww", reviewJson);
      setSingle(one);
      setReviews(reviewJson);
    }
    ret();
  }, []);
  return (
    <>
      <p>{movie}</p>
      <ul>
        {reviews.map((review) => {
          return <li key={review._id}>{review.review}</li>;
        })}
      </ul>
      <img src={single.poster} />
    </>
  );
}
