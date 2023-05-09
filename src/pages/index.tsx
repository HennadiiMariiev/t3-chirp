import { SignOutButton } from "@clerk/clerk-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const res = api.posts.getAll.useQuery();
  const data = res.data as Post[];

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="mb-4 w-[200px] rounded bg-white py-1 text-center text-green-700">
          {!user.isSignedIn ? <SignInButton /> : <SignOutButton />}
        </div>
        <div className="text-white">
          <h2 className="font-bold">Posts: </h2>
          {data &&
            data?.map((post: Post, idx: number) => (
              <div key={post?.id}>
                <span>{idx + 1}</span>. <span>{post?.content}</span> -{" "}
                {post?.createdAt?.toLocaleString()}
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
