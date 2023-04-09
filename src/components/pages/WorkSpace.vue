<template>
  <section>
    <base-card :CardCssName="'workspace'">
      <the-header></the-header>
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </base-card>
  </section>
</template>

<script>
import TheHeader from "./TheHeader.vue";

export default {
  components: { TheHeader },
  // mounted() {},
};
</script>

<style scoped></style>
