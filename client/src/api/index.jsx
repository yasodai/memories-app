import { map, tap, memoizeWith, always, identity, toString } from "ramda";
import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-post-app.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile"))?.token
    }`;
  }
  return req;
});

export const api = {
  fetchPost: memoizeWith(toString, (id) =>
    API.get(`/posts/${id}`).then(tap(console.log))
  ),
  // fetchPost: (id) => API.get(`/posts/${id}`).then(tap(console.log)),
  fetchPosts: (page) =>
    API.get(`/posts?page=${page}`).then(tap((x) => console.log(page, x))),
  fetchPostsByCreator: (name) => API.get(`/posts/creator?name=${name}`),
  fetchPostsBySearch: memoizeWith(toString, (searchQuery) =>
    API.get(
      `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
        searchQuery.tags
      }`
    ).then(tap((x) => console.log(searchQuery, x)))
  ),
  createPost: (newPost) => API.post("/posts", newPost).then(tap(console.log)),
  likePost: (id) => API.patch(`/posts/${id}/likePost`),
  comment: (value, id) => API.patch(`/posts/${id}/commentPost`, { value }),
  updatePost: (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost),
  deletePost: (id) => API.delete(`/posts/${id}`).then(tap(console.log)),
  signIn: (formData) =>
    API.post("/user/signin", formData).then(tap(console.log)),
  signUp: (formData) =>
    API.post("/user/signup", formData).then(tap(console.log)),
};
