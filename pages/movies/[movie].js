import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ReactPlayer from "react-player/youtube";
import Iframe from "react-iframe";
import NotLoggedIn from "@/components/NotLoggedIn";
import Image from "next/image";
export default function SingleMovie({}) {
  const { data: session } = useSession();
  console.log("session in /movies", session);
  const router = useRouter();
  const { movie } = router.query;
  const [single, setSingle] = useState({});
  const [reviews, setReviews] = useState([]);
  const textRef = useRef("");
  async function submitHandler(e) {
    e.preventDefault();
    console.log(
      "addReview",
      textRef.current.value,
      session.user.email,
      session.user.name
    );

    const newReview = {
      movieTitle: movie,
      reviewBody: textRef.current.value,
      userName: session.user.name,
      userEmail: session.user.email,
    };
    console.log(JSON.stringify(newReview));
    const res = await fetch(`/api/reviews/${movie}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });
    let jsonRes = await res.json();
    const returnedReview = {
      _id: jsonRes.insertedId,
      title: movie,
      review: textRef.current.value,
      userEmail: session.user.email,
      userName: session.user.name,
    };
    setReviews([...reviews, returnedReview]);
  }
  // console.log(movie);
  console.log("single", single);
  console.log("review", reviews);
  async function deleteHandler(e) {
    // console.log(e.currentTarget.getAttribute("data-customid"));
    const deleteId = e.currentTarget.getAttribute("data-customid");
    const deletedReviews = reviews.filter((reviewObj) => {
      return reviewObj._id != deleteId;
    });
    // console.log(deletedReviews);

    const data = await fetch(`/api/reviews/delete/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ title: movie }),
      },
    });
    const reviewArray = await fetch(`/api/movies/delete/${movie}/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setReviews(deletedReviews);
  }
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

  if (session && single) {
    return (
      <>
        <div>
          {/*Put a background from background array here math.random single.backdrops.length *100? make it absolute or something? */}
          <div className="bg-white items-center justify-center rounded-md">
            <Image
              className="absolute z-10"
              src={single.poster}
              width={100}
              height={100}
            />
            <div className="flex items-center justify-center">
              {single.backdrops && (
                <img
                  src={
                    single.backdrops[
                      Math.floor(Math.random() * single.backdrops.length)
                    ]
                  }
                />
              )}
            </div>
            <p className="text-center">{movie}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ul>
            {!reviews.length && <p>No reviews</p>}
            {reviews.map((review) => {
              return (
                <li
                  className="m-2 border-2 flex bg-slate-300 min-h-reviewBoxHeight max-w-4xl rounded-lg md:min-w-reviewBoxWidthMd"
                  key={review._id}
                >
                  <p className="w-3/4">{review.review}</p>
                  {review.userEmail == session.user.email && (
                    <div>
                      <button
                        className="px-2"
                        data-customid={review._id}
                        onClick={deleteHandler}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <p>by {review.userName}</p>
                </li>
              );
            })}
          </ul>
          <div className="m-8 flex flex-col justify-center items-center w-3/4 bg-slate-400 rounded-md">
            <form
              className="flex flex-col w-full justify-center items-center"
              onSubmit={submitHandler}
            >
              <label>Review</label>
              {/* <input
              placeholder="My Review"
              type="text"
              name="review"
              ref={textRef}
              className="border-0 border-blue-700 min-w-reviewBoxWidth min-h-reviewBoxHeight"
            /> */}
              <textarea
                className="min-w-reviewBoxWidth w-full resize-none max-w-4xl"
                placeholder="Write your review here"
                rows={4}
                ref={textRef}
                onChange={() => {
                  console.log(textRef.current.value);
                }}
              ></textarea>
              <button className="bg-blue-500 rounded-md text-white border-b-4 border-blue-700 mt-2">
                Submit Review
              </button>
            </form>
          </div>
        </div>
        {/* {single.trailerLink && <ReactPlayer url={single.trailerLink} />} */}
        {single.trailerLink && <Iframe url={single.trailerLink} />}
      </>
    );
  } else if (session && !single) {
    return <p>loading</p>;
  } else {
    return <NotLoggedIn />;
  }
}
