import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function SingleMovie({}) {
  const router = useRouter();
  const { movie } = router.query;
  const [single, setSingle] = useState({});
  useEffect(() => {
    async function ret() {
      const data = await fetch(`/api/movies/${movie}`);
      console.log(data);
      const one = await data.json();
      console.log(one);
      setSingle(one);
    }
    ret();
  }, []);
  return (
    <>
      <p>{movie}</p>
      <img src={single.poster} />
    </>
  );
}
