<template>
  <div
    class="
      flex flex-col
      bg-white
      border border-stone-100
      px-5
      py-3
      mb-4
      rounded-lg
    "
  >
    <div class="flex items-start mb-2">
      <div
        :style="{ backgroundColor: post.user.color || '#e8e8e8' }"
        class="w-8 h-8 overflow-hidden rounded-full p-1 mr-2"
      >
        <img class="rounded-full object-cover" :src="post.user.avatar" />
      </div>

      <span class="text-gray-900 my-auto">
        {{ post.user.name }}
      </span>
    </div>
    <div>
      <h1 class="font-semibold text-gray-700">
        {{ post.title }}
      </h1>
      <p>
        {{ post.content }}
      </p>
    </div>
    <div v-if="post.images[0]" class="py-3">
      <div
        class="grid"
        :class="{ multiple: post.images[1], 'grid-cols-2': post.images[1] }"
      >
        <div
          v-for="(img, i) in post.images"
          :key="i"
          class="img-c rounded-2xl w-full"
          :class="{ 'overflow-hidden': !(img_active && i == img_i) }"
        >
          <img
            @click="toggleImage(i)"
            :class="{ scaled: img_active && i == img_i }"
            class="w-full rounded-2xl"
            :src="img"
            :alt="post.title + ' image'"
          />
        </div>
      </div>
    </div>

    <transition name="fade">
      <div @click="hideImage" v-if="img_active" class="whole"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_active: false,
      img_i: null,
    };
  },
  props: {
    post: Object,
  },
  filters: {
    date(s) {
      return new Date(s).toLocaleDateString();
    },
  },
  methods: {
    toggleImage(i) {
      if (this.img_active) {
        this.hideImage();
      } else {
        this.showImage(i);
      }
    },
    hideImage() {
      this.img_active = false;
      this.img_i = null;
    },
    showImage(i) {
      this.img_active = true;
      this.img_i = i;
    },
  },
};
</script>

<style scoped>
img.scaled {
  transform: scale(1.2);
  z-index: 51;
  position: relative;
  cursor: zoom-out !important;
  max-height: 60vh;
}
.img-c img {
  cursor: zoom-in;
  transition: transform 0.15s ease;
}
.img-c {
  height: 15rem;
}
.multiple .img-c {
  height: 10rem !important;
}
.multiple .img-c:nth-child(1),
.multiple .img-c:nth-child(1) img {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.multiple .img-c:nth-child(2),
.multiple .img-c:nth-child(2) img {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s ease;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
</style>