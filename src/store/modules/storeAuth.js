// import { createStore } from "vuex";

import { auth } from "../../FireBase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import router from "../../router.js";

export default {
  namespaced: true,
  state() {
    return {
      UserInfo: {},
      Userdata: {},
      RegisterErrorMessage: "",
      LoginErrorMessage: "",
      isLoading: false,
      // isInProgress: false,
    };
  },
  actions: {
    changeIsLoading(context, payload) {
      context.commit("changeIsLoading", payload);
    },
    RegisterNewUser(context, payload) {
      context.commit("changeRegisterMessage", "");
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(() => {
          // console.log(userCredential.user);
          // console.log("Register Success");
        })
        .catch((error) => {
          console.log(error);
          context.commit("changeRegisterMessage", error.message);
          // ..
        });
    },
    async Login(context, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(() => {
          // Signed in
          // const user = userCredential.user;
          // console.log("Login by Email and PW :", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          context.commit("changeLoginMessage", errorCode);
        });
    },
    async init(context) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // context.commit("changeIsLoading", true);
          context.commit("writeStateUserInfo", user);
          // console.log(context.state.UserInfo);
          const UserId = context.state.UserInfo.id;
          // console.log("Log in Success");
          context.commit("changeIsLoading", false);
          router.push({ path: `/workspace/${UserId}/todolist` });
        } else {
          // User is signed out
          // console.log("User not logged in : ", user);
          // this.$store.dispatch("AuthModule/changeIsLoading", false);
          context.dispatch("ToDoModule/clearState", {}, { root: true });
          context.dispatch("RoutineModule/clearState", {}, { root: true });
          this.UserInfo = {};
          context.commit("changeProgressState", false);
          context.commit("changeIsLoading", false);
        }
      });
    },
    Logout() {
      signOut(auth)
        .then(() => {
          // console.log("Logout !");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearErrorMessage(context) {
      context.commit("clearErrorMessage");
    },
    forgetPw(_, email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // console.log(email);
          // console.log("email sent");
          // ..
        })
        .catch((error) => {
          // console.log(email);
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    },
    changeProgressState(context, payload) {
      context.commit("changeProgressState", payload);
    },
  },
  mutations: {
    changeIsLoading(state, payload) {
      state.isLoading = payload;
    },
    changeRegisterMessage(state, payload) {
      if (payload === "Firebase: Error (auth/email-already-in-use).") {
        const errorMessage = "該帳號已經被註冊.";
        state.RegisterErrorMessage = errorMessage;
      } else if (payload === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        const errorMessage = "密碼至少需要六個字元.";
        state.RegisterErrorMessage = errorMessage;
      } else {
        state.RegisterErrorMessage = payload;
      }
    },
    changeLoginMessage(state, payload) {
      if (!payload) return;
      if (payload.includes("user-not-found")) {
        state.LoginErrorMessage = "該帳號尚未註冊";
      } else if (payload.includes("auth/wrong-password")) {
        state.LoginErrorMessage = "密碼錯誤";
      } else {
        return;
      }
    },
    writeStateUserInfo(state, payload) {
      state.UserInfo.id = payload.uid;
      state.UserInfo.email = payload.email;
    },
    clearUserInfo(state) {
      state.UserInfo.id = "";
      state.UserInfo.email = "";
    },
    clearErrorMessage(state) {
      state.LoginErrorMessage = state.RegisterErrorMessage = "";
    },
    changeProgressState(state, payload) {
      state.isInProgress = payload;
    },
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    getRegisterErrorMessage(state) {
      return state.RegisterErrorMessage;
    },
    getLoginErrorMessage(state) {
      return state.LoginErrorMessage;
    },
    getUserId(state) {
      return state.UserInfo.id;
    },
    getUserEmail(state) {
      return state.UserInfo.email;
    },
    getUserName(state) {
      const email = state.UserInfo.email;
      const name = email.split("@")[0];
      return name;
    },
    getInProgress(state) {
      return state.isInProgress;
    },
  },
};
