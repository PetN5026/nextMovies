import Link from "next/link";
import { useRouter } from "next/router";
import OneMovie from "@/components/OneMovie";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
export default function MovieHome() {
  const { data: session } = useSession();
  const dummy = [
    { title: "movie1", author: "author1" },
    { title: "movie2", author: "author2" },
  ];
  const [movies, setMovies] = useState(dummy);
  // console.log("session", session);
  // session.user.test = "test";
  //session is straight from google and not my db so I will need to grab info from my db and maybe set it into sessions?
  useEffect(() => {
    async function ret() {
      const data = await fetch("/api/movies/");
      const object = await data.json();
      console.log(object);
      setMovies(object);
    }
    ret();
  }, []);

  console.log("movies", movies);
  function addTest() {
    const newArray = [...movies, { title: "movie3", author: "author3" }];
    setMovies(newArray);
  }

  if (session) {
    return (
      <div>
        <p>Hello</p>
        {movies.map((movie) => {
          return (
            <div key={movie.title}>
              <Link href={`/movies/${movie.title}`}>{movie.title}</Link>
              <img src={movie.poster} />
            </div>
          );
        })}
        {session.user.role == "admin" && <button onClick={addTest}>Add</button>}
      </div>
    );
  } else {
    return <p>login please</p>;
  }
}
