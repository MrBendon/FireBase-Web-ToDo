<template>
  <section>
    <div class="upperBox">
      <div class="helloUser">Hi, {{ getUserName }}</div>
      <base-button class="LogoutButton" :ButtonCssMode="'small'" @click="logout">登出</base-button>
    </div>

    <div class="title">GOGO Fighting</div>
    <div>
      <base-button :isLink="true" :to="getUsertodolist">待辦事項</base-button>
      <base-button :isLink="true" :to="getUserroutinelist">每日排程</base-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getUserName() {
      // const name = email.split("@");
      // console.log(name[0]);
      return this.$store.getters["AuthModule/getUserEmail"];
    },
    getUsertodolist() {
      return "/workspace/" + this.$store.getters["AuthModule/getUserId"] + "/todolist";
    },
    getUserroutinelist() {
      return "/workspace/" + this.$store.getters["AuthModule/getUserId"] + "/routinelist";
    },
  },
  methods: {
    getUserNameOnce() {
      return this.$store.getters["AuthModule/getUserEmail"];
    },
    logout() {
      this.$store.dispatch("AuthModule/Logout");
      this.$store.dispatch("AuthModule/changeIsLoading", true);
      this.$router.replace({ path: "/login" });
    },
  },
  unmounted() {
    // console.log("unmounted ! remove all click");
    window.removeEventListener("click", this.logout);
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  /* background-image: linear-gradient(135deg, rgba(206, 85, 172, 0.6), rgb(69, 69, 221, 0.6)); */
  min-height: 5rem;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
}

.upperBox {
  justify-self: end;
  display: flex;
  flex-direction: row;

  /* align-items: center; */
}

.helloUser {
  text-align: center;
  padding-top: 0.65rem;
}

.LogoutButton {
  align-self: flex-end;
  margin-left: auto;
}

.title {
  /* background-color: black; */
  margin: 0.75rem auto;
  font-size: 2.5rem;
}
</style>
