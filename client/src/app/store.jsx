import create from "zustand";

import { api } from "../api";
export default create((set, get) => ({
  posts: { data: [] },
  post: {},
  loading: false,
  authData: null,
  authLogin: (data) => {
    set({ authData: data });
    localStorage.setItem("profile", JSON.stringify(data));
  },
  authLogout: () => {
    set({ authData: null });
    localStorage.clear();
  },
  getPost: async (id) => {
    // api.fetchPost(id).then(({ data }) => set({ posts: data }));
    try {
      set({ loading: true });
      const { data } = await api.fetchPost(id);
      // set(({ posts }) => (posts.data = [data]));
      set({ loading: false, post: data });
    } catch (error) {
      set({ loading: false });
    }
  },
  getPosts: async (page) => {
    try {
      set({ loading: true });
      const { data } = await api.fetchPosts(page);
      set({ loading: false, posts: data });
    } catch (error) {
      set({ loading: false });
    }
  },
  getPostsByCreator: async (name) => {
    api.fetchPostsByCreator(name).then(({ data }) => set({ posts: data }));
  },
  getPostsBySearch: async (searchQuery) => {
    try {
      set({ loading: true });
      api
        .fetchPostsBySearch(searchQuery)
        .then(({ data }) => set({ posts: data }));
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
    // api
    //   .fetchPostsBySearch(searchQuery)
    //   .then(({ data }) => set({ posts: data }));
  },
  createPost: async (newPost, navigate) => {
    try {
      set({ loading: true });
      const { data } = await api.createPost(newPost);
      navigate(`/posts/${data._id}`);
      // set(({ posts }) => (posts.data = [data, ...posts.data]));
      set({ post: data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
    // api
    //   .createPost(newPost)
    //   .then(({ data }) =>
    //     set(({ posts }) => (posts.data = [data, ...posts.data]))
    //   );
  },
  updatePost: async (id, updatedPost, navigate) => {
    try {
      set({ loading: true });
      const { data } = await api.updatePost(id, updatedPost);
      navigate(`/posts/${data._id}`);
      set(
        ({ posts }) =>
          (posts.data = posts.data.map((post) =>
            post._id === data._id ? data : post
          ))
      );
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
    }
    // api
    //   .updatePost(id, updatedPost)
    //   .then(({ data }) =>
    //     set(
    //       ({ posts }) =>
    //         (posts.data = posts.data.map((post) =>
    //           post._id === data._id ? data : post
    //         ))
    //     )
    //   );
  },
  likePost: async (id) => {
    api
      .likePost(id)
      .then(({ data }) =>
        set(
          ({ posts }) =>
            (posts.data = posts.data.map((post) =>
              post._id === data._id ? data : post
            ))
        )
      );
  },
  commentPost: async (value, id) => {
    try {
      set({ loading: true });
      const { data } = await api.comment(value, id);
      set({ post: data });
      set({ loading: false });
      // return data.comments;
    } catch (error) {
      set({ loading: false });
    }
  },
  deletePost: async (id) => {
    api
      .deletePost(id)
      .then(() =>
        set(
          ({ posts }) =>
            (posts.data = posts.data.filter((post) => post._id !== id))
        )
      );
  },
  signIn: async (formData, navigate) => {
    api.signIn(formData).then(({ data }) => {
      get().authLogin(data);
      navigate("/");
    });
  },
  signUp: async (formData, navigate) => {
    api.signUp(formData).then(({ data }) => {
      get().authLogin(data);
      navigate("/");
    });
  },
}));
