import type { Post } from "@prisma/client";
import React, { useState } from "react";
import PostCard from "./PostCard";
import { useUser } from "@clerk/nextjs";

interface IProps {
  data: Post[] | undefined;
  isInProgress: boolean;
  deletePost: (id: string) => void;
  updatePost: (id: string, post: string) => void;
}

function PostList({
  data,
  deletePost,
  updatePost,
  isInProgress = false,
}: IProps) {
  const { user } = useUser();
  const [isUserPosts, setIsUserPosts] = useState(false);

  const posts = data
    ?.filter((post) => (isUserPosts ? user?.id === post?.authorId : true))
    .map((post) => (
      <PostCard
        key={post?.id}
        isInProgress={isInProgress}
        className={`${isInProgress ? "opacity-60" : "opacity-100"}`}
        post={post}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    ));

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="mb-3 flex w-[350px] items-center justify-between px-2">
        <h2 className="text-lg font-bold leading-[110%]">Posts:</h2>
        {user && (
          <div className="flex items-center leading-[110%]">
            <input
              id="checkbox"
              type="checkbox"
              onChange={() => setIsUserPosts((curr) => !curr)}
              checked={isUserPosts}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
              htmlFor="checkbox"
              className="ml-2 text-sm font-medium text-white hover:cursor-pointer dark:text-gray-300"
            >
              My posts
            </label>
          </div>
        )}
      </div>
      <ul className="flex w-full list-none flex-col justify-start gap-3 divide-y divide-solid divide-neutral-600 rounded-[16px] bg-neutral-700 px-4 py-3 sm:w-[350px]">
        {!!posts?.length && posts}
        {!posts?.length && !isInProgress && (
          <li className="text-center">Posts not found...</li>
        )}
        {isInProgress && (
          <li className="text-center text-xs opacity-60">Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default PostList;
