import Link from "next/link";
import { useRouter } from "next/router";
import OneMovie from "@/components/OneMovie";
import { useState, useEffect } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function MovieHome() {
  const dummy = [
    { title: "movie1", author: "author1" },
    { title: "movie2", author: "author2" },
  ];
  const [movies, setMovies] = useState(dummy);

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
      <button onClick={addTest}>Add</button>
    </div>
  );
}
