import useStore from "@/app/store";
import { clsx } from "@/utils";
import moment from "moment";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CommentSection } from "@/components";

export function PostDetails() {
  const { id } = useParams();
  const getPost = useStore((state) => state.getPost);
  const getPostsBySearch = useStore((state) => state.getPostsBySearch);
  const post = useStore((state) => (state.post._id === id ? state.post : {}));
  const recommended = useStore((state) =>
    state.posts.data?.filter(({ _id }) => _id !== id)
  );

  useEffect(() => {
    getPost(id);
  }, [id]);

  useEffect(() => {
    if (post._id === id)
      getPostsBySearch({ search: "none", tags: post.tags.join(",") });
  }, [post]);
  return (
    post && (
      <div
        className={clsx(
          "mt-3 px-5 py-6 rounded-md shadow-md bg-white",
          "max-w-[1240px] mx-auto space-y-5",
          "divide-y-2 "
        )}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {/* tags */}
            <div className="text-sm text-gray-500">
              {post.tags?.map((tag) => `#${tag} `)}{" "}
            </div>
            {/* content */}
            <p className="text-gray-600">{post.message}</p>
            {/* Creator */}
            <p className="text-lg">Created by: {post.name}</p>
            {/* moment */}
            <p className="text-sm">{moment(post.createdAt).fromNow()}</p>
          </div>

          {/* image */}
          <img
            className={clsx(
              "rounded-md w-full sm:w-8/12 lg:w-5/12 ",
              "object-center object-cover"
            )}
            src={post.selectedFile || `https://picsum.photos/400/300?random=1`}
            alt={post.title}
          />
        </div>
        {/* <div className="">Realtime Cart</div> */}
        <CommentSection post={post} />
        {recommended && (
          <div className="pt-3">
            <h5 className="text-xl font-semibold ">You might also like:</h5>

            <div className="p-3.5 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {recommended?.map((recommend, index) => (
                <div key={recommend._id} className="col-span-1 ">
                  <Link
                    to={`/posts/${recommend._id}`}
                    state={recommend}
                    className="flex flex-col h-full"
                  >
                    <h6 className="text-xl font-medium">{recommend.title}</h6>
                    <p className="text-gray-500">{recommend.name} </p>
                    <p className="text-gray-500 flex-1">
                      {recommend.message?.substring(0, 50)}...
                    </p>
                    <p className="text-gray-500 text-sm">
                      Likes: {recommend.likes.length}
                    </p>
                    <img
                      src={
                        recommend.selectedFile ||
                        `https://picsum.photos/300/200?random=${index}`
                      }
                      alt=""
                      className="w-48 "
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}
