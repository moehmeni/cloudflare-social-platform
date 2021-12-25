<template>
  <div>
    <div>
      <input
        required
        v-model="username"
        :class="inputCls"
        type="text"
        placeholder="Your username"
      />
    </div>
    <div v-if="false" :class="{ 'm-0': avatar_change }">
      <span>Change user avatar URL</span>
      <input type="checkbox" v-model="avatar_change" />
    </div>
    <div v-if="avatar_change">
      <input
        v-model="user_image_url"
        :class="inputCls"
        type="url"
        placeholder="Avatar URL"
      />
    </div>
    <div>
      <input
        required
        v-model="title"
        :class="inputCls"
        type="text"
        placeholder="Post title"
      />
    </div>
    <div>
      <textarea
        required
        v-model="content"
        :class="inputCls"
        placeholder="What's up"
      ></textarea>
    </div>
    <div :class="{ 'm-0': add_image }">
      <span>Attach image</span>
      <input type="checkbox" v-model="add_image" />
    </div>

    <div class="grid grid-cols-2 gap-3" v-if="add_image">
      <div class="m-0">
        <input
          v-model="image_url"
          :class="inputCls"
          type="url"
          placeholder="Image URL"
        />
      </div>
      <div class="m-0">
        <input
          v-model="image_url_2"
          :class="inputCls"
          type="url"
          placeholder="Image URL 2"
        />
      </div>
    </div>

    <div>
      <button :class="postBtnClass" @click="createPost">Post</button>
    </div>
    <div v-if="error">
      <div class="font-bold text-red-500 bg-red-50" v-text="error"></div>
    </div>
    <transition name="fade">
      <Loading v-if="loading" />
    </transition>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  head() {
    return {
      title: "Create a new post",
    };
  },
  data() {
    return {
      avatar_change: false,
      add_image: true,
      error: null,
      loading: false,
      username: "moehmeni",
      user_image_url:
        "https://gravatar.com/avatar/e3297fb564e80a12d448ff5ffd16c2c0?s=200&d=retro&r=x",
      image_url:
        "https://i1.sndcdn.com/avatars-VLbtGfCPXo70wHyY-8MMbjw-t500x500.jpg",
      image_url_2: "",
      title: "This is the title",
      content: "Yooooo this is a new content",
      inputCls:
        "rounded-xl px-4 py-3 border border-2 bg-gray-50 hover:bg-gray-100 focus:bg-transparent focus:outline-none focus:ring focus:ring-green-200",
    };
  },
  methods: {
    ...mapActions({
      createNewPost: "posts/createNewPost",
    }),
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    async createPost() {
      this.error = null;
      let u = this.username.trim().toLowerCase();
      let u_avatar = this.user_image_url.trim();
      let t = this.title.trim();
      let c = this.content.trim();
      let images = this.add_image ? [this.image_url] : [];
      if (this.image_url_2.trim()) {
        images.push(this.image_url_2);
      }
      if (u && t && c) {
        const data = {
          user: { name: u, avatar: u_avatar, color: this.getRandomColor() },
          title: t,
          content: c,
          images,
        };
        this.loading = true;
        let e = await this.createNewPost(data);
        this.loading = false;
        if (e) {
          this.error = e;
        } else {
          // successfull
          this.$router.push("/");
        }
      } else {
        alert("Please fill out the all required fields");
      }
    },
  },
  computed: {
    ...mapGetters({
      newPost: "posts/newPost",
    }),
    postBtnClass() {
      let focus = `bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300`;
      return "rounded-full px-3 text-white py-1 " + focus;
    },
  },
};
</script>

<style scoped>
div:not(div.m-0) {
  margin-bottom: 1.5rem;
}
div.m-0 {
  margin-bottom: 0.5rem;
}
input:not([type^="checkbox"]),
textarea {
  width: 100%;
}
textarea {
  min-height: 150px;
  max-height: 300px;
}
</style>