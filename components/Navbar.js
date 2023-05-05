import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex bg-neutral-300">
      <Link className="navButtons" href={"/"}>
        <p className="text-decoration-line : underline">HomeButton</p>
      </Link>
      <Link className="navButtons" href={"/movies"}>
        <p className="text-decoration-line : underline">Movies</p>
      </Link>
    </div>
  );
}
