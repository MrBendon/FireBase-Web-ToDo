<template>
  <!-- <base-spinner v-if="isLoading"></base-spinner> -->
  <base-card @click="cancel" class="SignUpPage">
    <transition name="about">
      <base-card v-if="showAbout" class="about" :CardCssName="'about'">
        <div class="aboutBox">
          <div class="about__text">
            <h4>功能說明：</h4>
            <ul class="about__list">
              <li>記事本與每日排程器CRUD</li>
              <li>排程器每日任務重置</li>
              <li>帳戶登入、註冊、驗證</li>
            </ul>
            <br />
            <h4>此網頁為自我練習之作品，使用工具與技術包含以下：</h4>
            <!-- <br /> -->
            <ul class="about__list">
              <li>Vue 3 Option API and Vue CLI</li>
              <li>Vuex</li>
              <li>Vue Router</li>
              <li>Firebase Authentication and Firestore</li>
            </ul>
          </div>
          <!-- <base-button @click="toggleshowAbout">CLOSE</base-button> -->
        </div>
      </base-card>
    </transition>
    <div class="title">
      <div class="infoImg">
        <img
          @mouseover="toggleshowAbout"
          @mouseout="toggleshowAbout"
          src="../../../assets/information.png"
          alt=""
        />
      </div>
      <div>Just do it</div>
      <div>And</div>
      <div>Keep Fighting.</div>
    </div>
    <br />
    <form @submit.prevent="SignUp" class="Form-Control">
      <div>
        <input
          v-model.trim="EmailInput"
          type="email"
          @change="outputTest"
          placeholder="Enter Your Email"
          autocomplete="username"
        />
        <transition name="alert" mode="out-in">
          <div v-if="!isValidation && !EmailInput" class="alert">請輸入有效的Email</div>
          <div class="alert" v-else-if="hasRegisterErrorMessage && !EmailInput">
            {{ hasRegisterErrorMessage }}
          </div>
          <div v-else class="blank">&nbsp;</div>
        </transition>
      </div>
      <div class="PWinputBox">
        <input
          v-model="PasswordInput"
          :type="inputForm"
          placeholder="Enter Your Account Password"
          autocomplete="current-password"
        />
        <img
          v-if="showPW"
          @click="changeshowPW"
          class="eye"
          src="../../../assets/hide.png"
          alt="showpassword"
        />
        <img v-else @click="changeshowPW" class="eye" src="../../../assets/view.png" alt="hidepassword" />
        <transition name="alert" mode="out-in">
          <div v-if="PWError" class="alert">{{ PWError }}</div>
          <div v-else>&nbsp;</div>
        </transition>
      </div>
      <div class="midBox">
        <router-link class="goLogin" :isLink="true" to="/login">我有帳號了 => 前往登入</router-link>
      </div>
      <div class="buttonBox">
        <base-button @click="SignUp">註冊</base-button>
        <!-- <base-button @click="SignUp">註冊</base-button> -->
      </div>
    </form>
    <br />
    <div class="CenterDiv"></div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      EmailInput: "",
      PasswordInput: "",
      isValidation: true,
      showPW: false,
      isLoading: false,
      showAbout: false,
    };
  },
  computed: {
    inputForm() {
      return this.showPW ? "text" : "password";
    },
    hasRegisterErrorMessage() {
      return this.$store.getters["AuthModule/getRegisterErrorMessage"];
    },
    PWError() {
      if (!this.isValidation && this.PasswordInput === "") {
        return "請輸入密碼";
      } else if (!this.isValidation && this.PasswordInput.length < 6) {
        return "密碼需六個字元以上";
      } else {
        return false;
      }
    },
  },
  methods: {
    toggleshowAbout() {
      this.showAbout = !this.showAbout;
    },
    changeshowPW() {
      this.showPW = !this.showPW;
    },
    Validation() {
      if (
        this.EmailInput === "" ||
        this.PasswordInput === "" ||
        !this.EmailInput.includes("@") ||
        this.PasswordInput.length < 6
      ) {
        this.isValidation = false;
        return false;
      } else {
        return true;
      }
    },
    cancel() {
      this.showAbout = false;
    },
    async SignUp() {
      this.Validation();
      if (!this.Validation()) {
        // console.log("Validation failed");
        return;
      }
      this.isLoading = true;
      const email = this.EmailInput;
      const password = this.PasswordInput;
      this.$store.dispatch("AuthModule/changeIsLoading", true);
      await this.$store.dispatch("AuthModule/RegisterNewUser", { email, password });
    },
  },
  mounted() {
    this.$store.dispatch("AuthModule/changeIsLoading", false);
  },
  updated() {
    this.isLoading = false;
    this.EmailInput = this.PasswordInput = "";
  },
  beforeUnmount() {
    // this.isLoading = false;
    this.EmailInput = this.PasswordInput = "";
    this.$store.dispatch("AuthModule/clearErrorMessage");
  },
  unmounted() {
    this.isLoading = false;
    this.$store.dispatch("AuthModule/changeIsLoading", true);
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 3rem;
  margin: 1rem auto;
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 1rem;
}

input::placeholder {
  text-align: center;
}
.title {
  font-size: 2.5rem;
  /* display: ; */
  position: relative;
  font-family: "Noto Sans TC", sans-serif;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
}

.about {
  position: absolute;
  z-index: 5;
  top: 7rem;
}

.aboutBox {
  padding: 2rem 1rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.about__list {
  padding: 1rem 1.5rem;
}

.infoImg {
  position: absolute;
  top: -5px;
  right: 0.5rem;
  width: 30px;
  height: 30px;
}

.infoImg img {
  width: 30px;
  height: 30px;
  opacity: 0.6;
  filter: saturate(0.6), brightness(1.3);
  transition: all 0.3s;
}

.infoImg img:hover {
  opacity: 1;
  cursor: pointer;
  /* transform: translateY(-3px); */
}

.Form-Control {
  display: inline-flexbox;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 600px; */
}

.alert {
  color: rgb(188, 31, 31);
  font-size: 12px;
  display: flex;
  justify-content: center;

  /* margin: 0 auto; */
}

.midBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.forgetPW,
.goLogin {
  width: 10rem;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: rgb(182, 182, 182);
  margin: 1rem auto;
  transition: all 0.25s;
  text-decoration: none;
}
.forgetPW:hover,
.goLogin:hover {
  color: rgb(80, 80, 80);
  cursor: pointer;
}

.PWinputBox {
  position: relative;
}

.eye {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40%;
  right: 3%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  transition: all 0.3s;
}

.eye:hover {
  opacity: 1;
  cursor: pointer;
  transform: translate(-50%, -55%);
}
.eye:active {
  transform: translate(-50%, -45%);
}

.buttonBox {
  display: flex;
  justify-content: center;
}

.alert-enter-from {
  opacity: 0.6;
  transform: translateY(-5px);
}

.alert-enter-to,
.alert-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.35s ease-in-out;
}

.blank {
  height: 1.25rem;
}

.about-enter-from,
.about-leave-to {
  opacity: 0;
  transform: scale(0);
}

.about-enter-to,
.about-leave-from {
  opacity: 1;
  transform: scale(1);
}

.about-enter-active,
.about-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: top right;
}
</style>
