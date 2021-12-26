<template>
  <div>
    <transition name="fade">
      <Loading v-if="loading" />
    </transition>
    <transition name="fade">
      <div v-if="posts[0]">
        <PostItem v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
      <div
        style="height: 500px"
        class="nothing opacity-50 grid text-center text-gray-400"
        v-else
      >
        <div class="my-auto">
          <div>
            <SvgEmpty />
          </div>
          <div class="mt-3">
            <span> No posts yet, post the firstone :) </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  head() {
    return {
      title: "Social Platform",
    };
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getAllPosts: "posts/getAllPosts",
    }),
  },
  computed: {
    ...mapGetters({
      posts: "posts/posts",
    }),
  },
  async created() {
    this.loading = true;
    await this.getAllPosts();
    this.loading = false;
  },
};
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.whole {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  backdrop-filter: blur(3px);
}

.nothing svg {
  width: 100px;
  height: 100px;
}
</style>