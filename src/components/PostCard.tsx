import React, { useRef, useState } from "react";
import clx from "classnames";
import type { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import TrashIcon from "./icons/TrashIcon";
import { prepareUserInitials } from "~/utils/prepareUserInitials";
import EditIcon from "./icons/EditIcon";
import SaveIcon from "./icons/SaveIcon";
import timeFromNow from "~/utils/timeFromNow";

const MIN_POST_LENGTH = 2;
interface IProps {
  className: string;
  post: Post;
  deletePost: (id: string) => void;
  updatePost: (id: string, post: string) => void;
  isInProgress: boolean;
}

function PostCard({
  post,
  className = "",
  deletePost,
  updatePost,
  isInProgress,
}: IProps) {
  const { user } = useUser();
  const contentRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(post?.content);

  if (!post) {
    return null;
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && value?.length >= MIN_POST_LENGTH) {
      updatePost(post?.id, value);
      setIsEdit(false);
    }
  };

  return (
    <li className={clx("flex items-center justify-start pt-3", className)}>
      {post?.author?.profilePicture ? (
        <Image
          src={post?.author?.profilePicture}
          alt={post?.author?.userName}
          width={24}
          height={24}
          className="mr-3 rounded-full"
          title={post?.author?.userName}
        />
      ) : (
        <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-slate-200 p-1 text-sm text-neutral-800 sm:mr-2">
          {prepareUserInitials(post?.author?.userName)}
        </span>
      )}
      <div className="flex w-[100%] flex-col items-start justify-between">
        <div className="flex flex-row items-start justify-between">
          <span className="mr-1 text-xs font-bold text-slate-300">
            {post?.author?.userName}
          </span>
          {post?.createdAt && (
            <span className="text-[11px] text-slate-300 ">
              {timeFromNow(post?.createdAt)}
            </span>
          )}
        </div>
        {user?.id === post?.authorId ? (
          <input
            type="text"
            className={`mb-1 w-[100%] bg-transparent text-base leading-[120%] text-white ${
              value?.length < MIN_POST_LENGTH ? "outline outline-red-300" : ""
            }`}
            disabled={!isEdit}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTimeout(() => setIsEdit(false), 500)}
            onKeyDown={onEnterPress}
            title={
              isEdit ? "Edit post and press Enter" : "Click Edit to update post"
            }
            ref={contentRef}
            value={value}
          />
        ) : (
          <p className="w mb-1 w-[100%] break-all bg-transparent text-base leading-[120%] text-white">
            {post?.content}
          </p>
        )}
      </div>
      {user?.id === post?.authorId && (
        <>
          <button
            className="ml-3 flex h-[30px] min-w-[30px] items-center justify-center rounded-full bg-neutral-600 text-slate-200 transition-all duration-300 hover:text-white"
            onClick={() => {
              if (isEdit) {
                updatePost(post?.id, value);
              } else {
                setIsEdit(true);
                setTimeout(() => contentRef?.current?.focus(), 0);
              }
            }}
            title={isEdit ? "Save" : "Edit"}
            disabled={
              isInProgress || (isEdit && value?.length < MIN_POST_LENGTH)
            }
          >
            {isEdit ? <SaveIcon width={16} /> : <EditIcon width={16} />}
          </button>
          <button
            className="ml-2 flex h-[30px] min-w-[30px] items-center justify-center rounded-full bg-neutral-600 text-slate-200 transition-all duration-300 hover:text-white"
            onClick={() => deletePost(post?.id)}
            title="Delete"
            disabled={isInProgress}
          >
            <TrashIcon width={20} />
          </button>
        </>
      )}
    </li>
  );
}

export default PostCard;
