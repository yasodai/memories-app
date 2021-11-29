import React from "react";
import { Icon } from "@/components";

function Like({ user, post }) {
  const likes = post?.likes?.length;
  if (likes > 0) {
    return post.likes.find((id) => id === user) ? (
      <>
        <Icon.ThumbSolid className="w-6" />
        <span>
          {likes > 2
            ? `You and ${likes - 1} others`
            : `${likes} like${likes > 1 ? "s" : ""}`}
        </span>
      </>
    ) : (
      <>
        <Icon.ThumbOutline className="w-6" />
        <span>
          {likes}
          {likes === 1 ? "Like" : "Likes"}
        </span>
      </>
    );
  }
  return (
    <>
      <Icon.ThumbOutline className="w-6" />
      <span>Like</span>
    </>
  );
}

export default Like;
