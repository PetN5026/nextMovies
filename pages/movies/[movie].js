import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
export default function SingleMovie({}) {
  const router = useRouter();
  const { movie } = router.query;
  const [single, setSingle] = useState({});
  const [reviews, setReviews] = useState([]);
  const textRef = useRef("");
  async function submitHandler(e) {
    e.preventDefault();
    console.log("addReview", textRef.current.value);
    const newReview = { movieTitle: movie, reviewBody: textRef.current.value };
    console.log(JSON.stringify(newReview));
    const res = await fetch(`/api/reviews/${movie}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });
    let jsonRes = await res.json();
    // console.log(jsonRes.insertedId);
    // console.log(res.json);
    const returnedReview = {
      _id: jsonRes.insertedId,
      title: movie,
      review: textRef.current.value,
    };
    setReviews([...reviews, returnedReview]);
  }
  // console.log(movie);
  console.log("single", single);
  console.log("review", reviews);
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
        <ul>
          {!reviews.length && <p>No reviews</p>}
          {reviews.map((review) => {
            return <li key={review._id}>{review.review}</li>;
          })}
        </ul>
        <div className="m-8 flex flex-col">
          <form className="flex flex-col" onSubmit={submitHandler}>
            <label>Review</label>
            <input
              placeholder="My Review"
              type="text"
              name="review"
              ref={textRef}
              className="border-0 border-blue-700"
            />
            <button className="bg-slate-400 rounded-md">Submit Review</button>
          </form>
        </div>
        <img src={single.poster} />
      </>
    );
  } else {
    return <p>loading</p>;
  }
}
