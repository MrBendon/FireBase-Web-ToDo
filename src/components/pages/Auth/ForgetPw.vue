<template>
  <teleport to="body">
    <div class="backdrop" @click="cancel"></div>
    <!-- <base-spinner v-if="isInProgress"></base-spinner> -->

    <base-card v-if="!showSent" class="forgetPage">
      <div class="Box">
        <h3>忘記密碼</h3>
        <p class="p">我們將向您發送密碼重置電子郵件</p>
        <input v-model.trim="email" type="email" placeholder="enter your email" autocomplete="email" />
        <transition name="error" mode="out-in">
          <p v-if="!isValid" class="errorMessage">請輸入正確電子信箱</p>
          <p v-else class="errorMessage">&nbsp;</p>
        </transition>
        <div class="buttonBox">
          <base-button @click="cancel">取消</base-button>
          <base-button @click="EmailComfirm">確認</base-button>
        </div>
      </div>
    </base-card>
    <base-card v-if="showSent" class="sentCheck">
      <h3>重置信件已寄送</h3>
      <p>請至您輸入的電子信箱查看信件</p>
      <div class="sentbuttonBox">
        <base-button @click="cancel">確認</base-button>
      </div>
    </base-card>
  </teleport>
</template>

<script>
export default {
  emits: ["cancel"],
  data() {
    return {
      email: "",
      isValid: true,
      showSent: false,
    };
  },
  methods: {
    cancel() {
      this.showSent = false;
      this.$emit("cancel");
    },
    EmailComfirm() {
      if (this.email === "" || !this.email.includes("@")) {
        this.isValid = false;
        return;
      }
      // console.log(this.email);
      this.$store.dispatch("AuthModule/forgetPw", this.email);
      this.showSent = true;
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 5;
}

.forgetPage {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  /* margin: 0 auto; */
  height: 350px;
  z-index: 10;
  display: flex;
  align-items: center;
}

.sentCheck {
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  height: 200px;
}

.Box {
  display: flex;
  flex-direction: column;
  width: 320px;
  align-items: center;
  color: rgb(81, 81, 81);
}
h3 {
  margin: 1rem 0;
  color: gray;
}

.p {
  font-size: 14px;
  margin: 0.5rem 0;
}

input {
  width: 80%;
  height: 2.75rem;
  margin: 0rem 1rem 0 0;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 1rem;
}

input::placeholder {
  text-align: center;
  color: rgb(189, 189, 189);
}

.buttonBox {
  margin: 2rem 0 1rem 0;
}

.errorMessage {
  margin: 0.5rem 0;
  color: rgb(172, 41, 41);
  font-size: 14px;
}

.error-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.error-enter-to,
.error-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.error-leave-to {
  opacity: 0;
  transform: translateY(3px);
}
.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease-in-out;
}

.sentCheck {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.sentbuttonBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
