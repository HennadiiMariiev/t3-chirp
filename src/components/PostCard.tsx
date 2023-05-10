import React from "react";
import clx from "classnames";
import { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import TrashIcon from "./icons/TrashIcon";
import { prepareUserInitials } from "~/utils/prepareUserInitials";

interface IProps {
  className: string;
  post: Post;
  deletePost: (id: string) => void;
}

function PostCard({ post, className = "", deletePost }: IProps) {
  const { user } = useUser();

  if (!post) {
    return null;
  }

  const userMeta = `${post?.author?.userName as string}`;

  return (
    <li className={clx("flex items-center justify-start", className)}>
      {post?.author?.profilePicture ? (
        <Image
          src={post?.author?.profilePicture}
          alt={userMeta}
          width={24}
          height={24}
          className="mr-3 rounded-full"
          title={userMeta}
        />
      ) : (
        <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-slate-200 p-1 text-sm text-neutral-800 sm:mr-2">
          {prepareUserInitials(userMeta)}
        </span>
      )}
      <div className="flex w-[300px] flex-col items-start justify-between">
        <p>{post?.content}</p>
        {post?.createdAt && (
          <span className="text-sm text-slate-300">
            {post?.createdAt?.toLocaleString()}
          </span>
        )}
      </div>
      {user?.id === post?.authorId && (
        <button
          className="ml-3 rounded-full bg-neutral-600 p-2 text-slate-200 transition-all duration-300 hover:text-white"
          onClick={() => deletePost(post?.id)}
          title="Delete post"
        >
          <TrashIcon width={20} />
        </button>
      )}
    </li>
  );
}

export default PostCard;
