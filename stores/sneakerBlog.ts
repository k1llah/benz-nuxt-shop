import { defineStore } from "pinia";
import axios from "axios";
export const useBlog = defineStore("blog", {
  state: () => ({
    posts: [] as any[],
    postId: localStorage.getItem("idPost"),
    token:
      "0f97b2ecb3d66470a5385e3aa6f555d4a65e7f5adbbb4a1cc8477c102ca49f73808267246dd1fe0f20ff307e30b23665db6a14477edbf9d1ab18e920936b0de98f02d50028149ead6b3cab6258d27956ada082a98229ab6617f20265b8ea7a8691e094b71c2d3a8906289546718ec45e3efe982dc0110ef4c5ae1a306affb1d6",
    infoPost: {} as any,
    isOpenedModal: false,
    isOpenedModalFeedback: false,
  }),
  actions: {
    async getStrapiData() {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/posts?populate=*",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.posts = res.data.data.map((post: any) => post);
      } catch (error) {
        console.log(error);
      }
    },
    async getPostById(id: number) {
      try {
        if (id !== null && id !== undefined) {
          const response = await axios.get(
            `http://localhost:1337/api/posts/${id}`,
            {
              params: {
                populate: "*",
              },
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          this.infoPost = response.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getPostByHashtag(hashtag: string) {
      try {
        if (hashtag !== null && hashtag !== undefined) {
          const response = await axios.get(
            `http://localhost:1337/api/posts?filters\[hashtags\][hashtagName][$contains]=${hashtag}`,
            {
              params: {
                populate: "*",
              },
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          this.posts = response.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    block() {
      document.body.style.overflow = "hidden";
    },
    unlock() {
      document.body.style.overflow = "visible";
    },
  },
});
