import React, { useState } from "react";
import { Label } from "@/components";
export function TagsInput({ tags, setTags }) {
  const [input, setInput] = useState("");

  const [isKeyReleased, setIsKeyReleased] = useState(true);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input?.trim();

    if (
      (key === " " || key === "Enter") &&
      trimmedInput &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input && tags && isKeyReleased) {
      e.preventDefault();
      const tagsCopy = tags;
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };
  return (
    <div className="">
      <Label type="tags" placeholder="Search Tags">
        <input
          onKeyDown={onKeyDown}
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={input}
          className="peer h-10"
          type="text"
          name="tags"
          id="tags"
          placeholder="Search Tags"
        />
      </Label>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-yellow-500 text-white my-1 mr-1 pl-2 rounded-md whitespace-nowrap select-none"
          >
            {tag}{" "}
            <button
              onClick={() => deleteTag(index)}
              className="bg-yellow-500 text-white px-2 rounded-md flex-auto"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
