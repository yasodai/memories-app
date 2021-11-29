import React, { useState, useRef } from "react";
import { Label } from "@/components";
import { clsx } from "./../utils";
import useStore from "@/app/store";
export function CommentSection({ post }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentPost = useStore((state) => state.commentPost);
  const [comment, setComment] = useState("");
  const commentsRef = useRef(null);

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    commentPost(finalComment, post._id);
    setComment("");
    setTimeout(() => {
      commentsRef.current.scrollIntoView();
    }, 1000);
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-3 pt-3">
      <div className="w-full lg:w-2/5  h-[200px] overflow-y-auto ">
        <h6 className="">Comments</h6>
        {post.comments?.map((c, i) => (
          <p key={i} className="text-gray-500 text-[15px]">
            <strong>{c.split(":")[0]}:</strong>
            {c.split(":")[1]}
          </p>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
        <div className="flex-1">
          <h6 className="font-semibold mb-2.5">Write a Comment</h6>
          <Label type="comment" placeholder="Comment" textarea>
            <textarea
              className="peer"
              name="comment"
              id="comment"
              cols="30"
              rows="4"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Label>
          <button
            className={clsx(
              "w-full text-white bg-blue-500 py-1",
              "disabled:bg-gray-300 disabled:text-gray-400",
              "rounded"
            )}
            disabled={!comment}
            onClick={handleClick}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
}
