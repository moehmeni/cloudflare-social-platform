<template>
  <button @click="click" :class="cls"><slot></slot></button>
</template>

<script>
export default {
  data() {
    return {
      defaultColor: "blue",
    };
  },
  props: {
    color: String,
    click: Function,
  },
  computed: {
    cls() {
      let c = this.color || this.defaultColor;
      let focus = `bg-${c}-500 hover:bg-${c}-600 active:bg-${c}-700 focus:outline-none focus:ring focus:ring-${c}-300`;
      return "rounded-full px-3 text-white py-1 " + focus;
    },
  },
};
</script>