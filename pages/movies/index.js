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
        <div className="bg-slate-400">
          {/* <label className="bg-slate-400 mx-4">Sort</label> */}
          <select
            // className="ml-4 rounded-sm"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <div className="md:flex flex-col items-center">
          {/* <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2"
          onClick={sortHandle}
        >
        sort
      </button> */}

          {movies.map((movie) => {
            return (
              <Link
                key={movie._id}
                href={`/movies/${movie.title}`}
                class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:min-w-reviewBoxWidthMd hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Image
                  class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={movie.poster}
                  alt=""
                  width={400}
                  height={400}
                />

                <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {movie.title}
                  </h5>
                  <ul>
                    {movie.genres &&
                      movie.genres.map((genre) => {
                        return (
                          <li
                            key={genre}
                            className="list-disc font-normal text-gray-700 dark:text-gray-400"
                          >
                            {`${genre}`}
                          </li>
                        );
                      })}
                    {/* <li className="list-disc font-normal text-gray-700 dark:text-gray-400"></li> */}
                  </ul>
                </div>
              </Link>
            );
          })}
          {/* {movies.map((movie) => {
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
        })} */}
          {session.user.role == "admin" && (
            <button onClick={addTest}>Add</button>
          )}
        </div>
      </div>
    );
  } else {
    return <p>login please</p>;
  }
}
