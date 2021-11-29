// @ts-ignore
import { Form, Pagination, Posts, Search } from "@/components/";
// @ts-ignore
import { clsx } from "@/utils";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function Home() {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const tags = query.get("tags");

  return (
    <div
      className={clsx(
        "sm:grid grid-cols-12 mt-3 gap-3",
        "flex flex-col-reverse ",
        "w-96 sm:w-full mx-auto"
      )}
    >
      <div className="col-span-8 xl:col-span-9">
        <Posts setCurrentId={setCurrentId} page={page} />
      </div>
      <div className="col-span-4 xl:col-span-3 space-y-3">
        <Search />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        {!searchQuery && !tags && <Pagination page={page} />}
      </div>
    </div>
  );
}
