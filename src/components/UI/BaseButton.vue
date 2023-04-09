<template>
  <button v-if="!isLink" :class="ButtonCssMode">
    <slot></slot>
  </button>
  <router-link v-else :to="LinkTo" :class="ButtonCssMode">
    <slot>預設Router-Link</slot>
  </router-link>
</template>

<script>
export default {
  props: {
    ButtonCssMode: {
      type: String,
      require: false,
    },
    isLink: {
      type: Boolean,
      require: false,
    },
    LinkTo: {
      type: String,
      require: false,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  text-align: center;
  height: 3rem;
  width: 8rem;
  margin: 1rem 1rem 0.25rem 1rem;
  background-color: rgb(95, 158, 160, 0.35);
  border: none;
  border-radius: 100px;
  padding: 0.65rem;
  display: inline-block;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

a:hover,
/* a:active, */
button:hover {
  background-color: rgba(85, 158, 160, 1);
  transform: translateY(-3px);
}

a:active,
button:active {
  transform: translateY(2px);
}

.router-link-active {
  /* background-color: rgba(4, 153, 71, 0.8); */
  background-image: linear-gradient(135deg, rgba(206, 85, 172, 0.6), rgb(69, 69, 221, 0.6));
}

.router-link-active:hover {
  /* background-color: rgba(24, 153, 4); */
  background-image: linear-gradient(135deg, #d666b6, rgb(69, 69, 221));
}

.loginAndSignup {
  margin: 2rem 1rem;
}

.small {
  margin: 0.5rem;
  padding: 0rem;
  height: 1.75rem;
  width: 4rem;
  font-size: 1rem;
  background-color: rgba(215, 185, 185, 0.6);
}

.small:hover {
  background-color: rgb(184, 133, 133);
}

.add {
  margin: 0rem;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  padding: 0.45rem 0;
}

.delete {
  margin: 0.2rem 0rem 0rem 0rem;
  height: 1.75rem;
  width: 1.75rem;
  /* background-image: url("../../assets/delete.png"); */
  background-image: url(../../assets/cercle+close+delete+dismiss+remove+icon-1320196712448219692.ico);
  opacity: 0.5;
  background-size: cover;
}

.delete:hover {
  /* background-color: rgb(241, 131, 131); */
  opacity: 1;
  transform: translateY(-2px);
}

.comfirm {
  background-color: rgba(207, 51, 51, 0.5);
}

.comfirm:hover {
  background-color: rgba(207, 51, 51);
}

.addRuntineEvent {
  /* background-image: linear-gradient(135deg, rgba(206, 85, 172, 0.6), rgb(69, 69, 221, 0.6)); */
  width: 50%;
  font-size: 13px;
  /* margin: 1.5rem auto; */
}

.addRuntineEvent:hover {
  background-image: linear-gradient(135deg, #d666b6, rgb(69, 69, 221));
}

.renew {
  width: 50%;
  font-size: 13px;
}
.renew:hover {
  background-image: linear-gradient(135deg, #a79ca4, rgb(110, 110, 111));
}
</style>
