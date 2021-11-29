import React, { useEffect, useState } from "react";
import useStore from "@/app/store";
import { clsx } from "@/utils";
import FileBase from "react-file-base64";
import { Label } from "@/components";
import { useNavigate } from "react-router-dom";

export function Form({ currentId, setCurrentId }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const createPost = useStore((state) => state.createPost);
  const updatePost = useStore((state) => state.updatePost);
  const post = useStore(({ posts }) =>
    currentId ? posts.data?.find((message) => message._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId) {
      updatePost(
        currentId,
        {
          ...postData,
          name: user?.result?.name,
        },
        navigate
      );

      clear();
    } else {
      createPost({ ...postData, name: user?.result?.name }, navigate);
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  useEffect(() => {
    setPostData(post);
  }, [post]);

  if (!user?.result?.name) {
    return (
      <div className="bg-white text-center p-2 rounded my-1 shadow-md">
        <p className="">
          Please Sign In to create your own memories and like other's memories
        </p>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex flex-col gap-3.5 bg-white p-3",
        "rounded-md shadow-md"
      )}
    >
      <h6 className="text-xl">{currentId ? "Editing" : "Create"} a memory</h6>
      <Label type="title" placeholder="Title">
        <input
          className="peer h-10"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={postData?.title || ""}
        />
      </Label>
      <Label type="message" placeholder="Message" textarea>
        <textarea
          className="peer"
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          name="message"
          id="message"
          cols="30"
          rows="4"
          placeholder="Message"
          value={postData?.message || ""}
        ></textarea>
      </Label>
      <Label type="tags" placeholder="Tags">
        <input
          className="peer h-10"
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          type="text"
          name="tags"
          id="tags"
          placeholder="Tags"
          value={postData?.tags || ""}
        />
      </Label>

      <FileBase
        type="file"
        multiple={false}
        onDone={
          ({ base64 }) => {}
          // setPostData({ ...postData, selectedFile: base64 })
        }
      />
      <button type="submit" className="bg-blue-500 text-white py-1.5 rounded">
        SUBMIT
      </button>
      <button
        type="reset"
        onClick={clear}
        className="bg-red-500 text-white py-1.5 rounded"
      >
        CLEAR
      </button>
    </form>
  );
}
