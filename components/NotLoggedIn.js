import Link from "next/link";

export default function NotLoggedIn() {
  return (
    <>
      <p>Not logged in please click here to log in</p>
      <Link href={"/"}>Log in</Link>
    </>
  );
}
