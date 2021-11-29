import React, { useState } from "react";
// @ts-ignore
import { Label } from "@/components";
// @ts-ignore
import { clsx } from "@/utils";
// @ts-ignore
import { TagsInput } from "@/components";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import useStore from "@/app/store";

export function Search() {
  const getPostsBySearch = useStore((state) => state.getPostsBySearch);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags?.length) {
      getPostsBySearch({ search, tags: tags.join(",") });
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //search post
      searchPost();
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-3.5 bg-white px-3 py-4",
        "rounded-md shadow-md"
      )}
    >
      <Label type="search" placeholder="Search Memories">
        <input
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          value={search}
          className="peer h-10"
          type="text"
          name="search"
          id="search"
          placeholder="Search Memories"
        />
      </Label>
      <TagsInput tags={tags} setTags={setTags} />
      <button
        onClick={searchPost}
        className="bg-blue-500 text-white py-1.5 rounded"
      >
        SEARCH
      </button>
    </div>
  );
}
