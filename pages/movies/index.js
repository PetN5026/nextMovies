import Link from "next/link";
import Image from "next/image";
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
      // console.log(object);
      setMovies(object);
    }
    ret();
  }, []);

  // console.log("movies", movies);
  function addTest() {
    const newArray = [...movies, { title: "movie3", author: "author3" }];
    setMovies(newArray);
  }

  function sortHandle() {
    const sorted = [...movies];
    // console.log(sorted);
    sorted.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase());
    // console.log(sorted);
    setMovies(sorted);
  }

  if (session) {
    return (
      <div>
        {/* <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2"
          onClick={sortHandle}
        >
          sort
        </button> */}
        <div className="bg-slate-400">
          {/* <label className="bg-slate-400 mx-4">Sort</label> */}
          <select
            className="ml-4 rounded-sm"
            onChange={(e) => {
              // console.log(e.currentTarget.value);
              const sort = e.currentTarget.value;
              const copy = [...movies];
              // console.log(copy);
              if (sort == 1) {
                copy.sort((a, b) => {
                  return a.title.toLowerCase() > b.title.toLowerCase();
                });
              } else {
                copy.sort((a, b) => {
                  return a.title.toLowerCase() < b.title.toLowerCase();
                });
              }
              // console.log(copy);
              setMovies(copy);
            }}
          >
            <option>Sort</option>
            <option className="p-2 m-2" value={1}>
              A...Z
            </option>
            <option value={-1}>Z...A</option>
          </select>
        </div>
        {movies.map((movie) => {
          return (
            <div
              className="w-4/5 flex m-4 p-4 bg-slate-200 rounded-md"
              key={movie.title}
            >
              <Image src={movie.poster} width={"100"} height={"100"} />
              <div className="m-2 p-2">
                <Link href={`/movies/${movie.title}`}>
                  <p className="underline">{movie.title}</p>
                </Link>
                <p>{`Release date : ${movie.releaseDate}`}</p>
                <div>
                  <ul>
                    {movie.genres &&
                      movie.genres.map((genre) => {
                        return (
                          <li key={genre} className="text-xs list-disc">
                            {`${genre}`}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
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
