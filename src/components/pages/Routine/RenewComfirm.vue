<template>
  <teleport to="body">
    <div class="backdrop" @click="cancel"></div>
    <div class="Box">
      <transition name="dialog">
        <dialog open class="MessageContainer">
          <h2>重置確認</h2>
          <p><slot name="p">確定要重置全部項目嗎？</slot></p>

          <div class="answer">
            <base-button @click="cancel">取消</base-button>
            <base-button @click="comfirm" :ButtonCssMode="'comfirm'">確定</base-button>
          </div>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["cancel-renew", "renew"],
  props: {
    // showRenewCheck: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  methods: {
    cancel() {
      this.$emit("cancel-renew");
    },
    comfirm() {
      this.$emit("renew");
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

.box {
  display: flex;
  justify-content: center;
}

.MessageContainer {
  /* position: fixed; */
  position: fixed;
  top: 20vh;
  margin: 0 auto;
  width: 350px;
  z-index: 10;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  /* overflow: hidden; */
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

h2 {
  margin: 1rem 0rem;
}
.answer {
  margin-top: 1rem;
  display: flex;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
