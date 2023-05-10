import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
export default function Login({ providers }) {
  console.log("providers", providers, Object.values(providers));
  return (
    <>
      <div className="mt-4 flex flex-col bg-slate-300 rounded-md items-center">
        <div className="bg-red-200 w-1/2 flex flex-col p-4 m-4 rounded-md">
          <p>Custom Login container</p>
          {Object.values(providers).map((provider) => {
            return (
              <button
                className="bg-stone-50 hover:bg-blue-400 text-black font-bold py-2 px-4 border-b-2 border-stone-400 hover:border-blue-500 rounded"
                key={provider.id}
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
