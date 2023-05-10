import { Post } from "@prisma/client";
import React from "react";
import PostCard from "./PostCard";

function PostList({
  data,
  deletePost,
  isProcess = false,
}: {
  data: Post[] | undefined;
  isProcess: boolean;
  deletePost: (id: string) => void;
}) {
  const posts = data?.map((post) => (
    <PostCard
      key={post?.id}
      className={`${isProcess ? "opacity-60" : "opacity-100"}`}
      post={post}
      deletePost={deletePost}
    />
  ));

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h2 className="mb-2 text-lg font-bold">Posts:</h2>
      <ul className="flex w-full list-none flex-col gap-3 rounded-[16px] bg-neutral-700 px-4 py-3 sm:w-[350px]">
        {!!posts?.length && posts}
        {!posts?.length && !isProcess && (
          <li className="text-center">Posts not found...</li>
        )}
        {isProcess && (
          <li className="text-center text-xs opacity-60">Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default PostList;
