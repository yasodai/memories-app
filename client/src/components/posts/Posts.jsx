import React from "react";
import useStore from "@/app/store";
import Post from "./Post";
import { Skeleton } from "@/components";
export function Posts({ setCurrentId, page }) {
  const posts = useStore((state) => state.posts.data);
  const loading = useStore((state) => state.loading);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
      {loading
        ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Skeleton key={n} />)
        : posts?.map((post, index) => (
            <Post
              page={page}
              post={post}
              key={post._id}
              index={index}
              setCurrentId={setCurrentId}
            />
          ))}
    </div>
  );
}
