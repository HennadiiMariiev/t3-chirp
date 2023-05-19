import type { Post } from "@prisma/client";
import React, { SetStateAction } from "react";

interface IProps {
  post: string;
  setPost: (value: SetStateAction<string>) => void;
  onAddPost: (post: string) => void;
  isInProgress: boolean;
}

function AddPost({ post, setPost, onAddPost, isInProgress }: IProps) {
  return (
    <div className="mb-5 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-stretch">
      <input
        type="text"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Please, add your post..."
        className="h-[40px] w-full rounded p-1 text-neutral-800"
      />
      <button
        className="min-w-[120px] max-w-[140px] rounded bg-violet-600 px-3 py-2 text-center text-white transition-all duration-300 hover:bg-violet-800"
        onClick={() => onAddPost(post)}
        disabled={isInProgress}
      >
        Add Post
      </button>
    </div>
  );
}

export default AddPost;
