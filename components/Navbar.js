import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();

  function signOutHelper() {
    signOut({ callbackUrl: "/" });
  }

  function signInHelper() {
    signIn();
  }
  return (
    <div className="flex bg-neutral-300">
      <Link className="navButtons" href={"/"}>
        <p className="text-decoration-line : underline">HomeButton</p>
      </Link>
      <Link className="navButtons" href={"/movies"}>
        <p className="text-decoration-line : underline">Movies</p>
      </Link>
      <div className="flex flex-grow justify-end items-center">
        {session ? (
          <p className="px-4 text-center"> Signed in as {session.user.name}</p>
        ) : (
          <p>Not signed in</p>
        )}
        <button
          className="px-4"
          onClick={session ? signOutHelper : signInHelper}
        >
          {session ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}
