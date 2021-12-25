<template>
  <div class="mx-auto container px-5 lg:w-1/3">
    <header :style="{ height: headerHeight }" class="fixed w-full">
      <div
        class="
          container
          mx-auto
          px-5
          lg:w-1/3
          flex
          h-full
          justify-between
          items-center
        "
      >
        <div>
          <nuxt-link to="/">
            <div class="font-bold">Social Media</div>
            <div class="-mt-2">
              <span class="text-xs"> by moehmeni@gmail.com </span>
            </div>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link :class="writeBtnClass" to="/new"
            >Write something</nuxt-link
          >
        </div>
      </div>
    </header>
    <div :style="{ marginTop: headerHeight }" class="py-5">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      writeModal: false,
      headerHeight: "60px",
    };
  },
  computed: {
    writeBtnClass() {
      let focus = `bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300`;
      return "rounded-full px-3 text-white py-1 " + focus;
    },
  },
};
</script>


<style>
header {
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(7px);
  background-color: rgba(240, 240, 240, 0.561);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}
</style>