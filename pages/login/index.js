import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
export default function Login({ providers }) {
  console.log("providers", providers, Object.values(providers));
  return (
    <>
      <div>Custom Login</div>
      {Object.values(providers).map((provider) => {
        return (
          <button key={provider.id} onClick={() => signIn(provider.id)}>
            {provider.name}
          </button>
        );
      })}
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
