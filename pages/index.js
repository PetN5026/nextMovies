import Image from "next/image";
import NotLoggedIn from "@/components/NotLoggedIn";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();

  if (data && data.user) {
    console.log("logged in", data);
  }
  {
    return (
      <>
        {data ? (
          <div className="bg-slate-600" id="home-container">
            <p>{`Logged in as ${data.user.name}`}</p>
            <button onClick={() => signOut({ redirect: false })}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="bg-slate-600" id="home-container">
            <p>You are not logged in please login with the button below</p>{" "}
            <button
              className="bg-orange-200 rounded-md"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        )}
      </>
    );
  }
}
