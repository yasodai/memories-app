import moment from "moment";
import React from "react";
import { Icon } from "../index";
import { clsx } from "./../../utils";
import useStore from "@/app/store";
import Like from "./Like";
import { Link } from "react-router-dom";
function Post({ post, setCurrentId, index, page }) {
  const deletePost = useStore((state) => state.deletePost);
  const likePost = useStore((state) => state.likePost);
  const profile = useStore((state) => state.authData?.result);
  const user = profile?.googleId || profile?._id;

  return (
    <div
      className={clsx(
        "flex flex-col gap-3 pb-3",
        "overflow-hidden",
        "relative rounded-md shadow-md bg-white",
        "group"
      )}
    >
      <img
        src={
          post.selectedFile || `https://picsum.photos/300/200?random=${index}`
        }
        alt=""
        className="h-52 sm:h-32 object-cover "
      />
      <div className="absolute left-3 top-3 text-white">
        <h6 className="text-2xl">{post.name}</h6>
        <p className="text-sm">{moment(post.createdAt).fromNow()} </p>
      </div>
      {user === post.creator && (
        <button
          onClick={() => setCurrentId(post._id)}
          className={clsx(
            "absolute right-4 top-4 text-white  px-0.5  rounded",
            "bg-opacity-75 bg-black",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <Icon.Menu className="w-6 " />
        </button>
      )}

      <div className={clsx("px-3 space-y-3 flex-1")}>
        <div className="text-sm text-gray-500">
          {post.tags.map((tag) => `#${tag} `)}{" "}
        </div>
        <h5 className="text-lg">{post.title}</h5>
        <div className="text-sm text-gray-500 max-h-20 overflow-hidden ">
          {post.message?.substring(0, 75)}...
        </div>
      </div>

      <div className="px-3 flex justify-between">
        {user && (
          <button
            onClick={() => likePost(post._id)}
            className="flex items-center text-sm text-blue-500 "
          >
            <Like user={user} post={post} />
          </button>
        )}
        {user === post.creator && (
          <button
            onClick={() => deletePost(post._id)}
            className="hover:text-red-500 "
          >
            <Icon.Trash className="w-6" />
          </button>
        )}
      </div>
      <div
        className={clsx(
          "absolute bg-black w-full h-screen ",
          "bg-opacity-25 opacity-0 group-hover:opacity-100",
          "transition-all pointer-events-none"
        )}
      ></div>
      <Link
        className={clsx(
          "absolute p-3 text-xl text-white tracking-widest rounded-xl",
          "left-2/4 top-1/2  -translate-x-1/2",
          "bg-opacity-75 bg-black",
          "opacity-0 group-hover:opacity-100"
        )}
        to={`/posts/${post._id}`}
        state={post}
        onClick={() => useStore.setState({ posts: { data: [] } })}
      >
        MORE
      </Link>
    </div>
  );
}

export default Post;
