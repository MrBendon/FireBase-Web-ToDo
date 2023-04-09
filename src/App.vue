<template>
  <section class="background">
    <router-view> </router-view>
    <base-spinner class="spinner" v-if="getIsLoading"></base-spinner>
  </section>
</template>

<script>
export default {
  // name: "App",
  components: {
    // LogInAndSignUp,
  },
  computed: {
    getIsLoading() {
      return this.$store.getters["AuthModule/getIsLoading"];
    },
  },
  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch("AuthModule/init");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  min-height: 920px;
  background-image: linear-gradient(rgb(214, 93, 45), rgb(23, 23, 170));
  padding: 1rem;
  position: relative;
}

.spinner {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}
</style>
