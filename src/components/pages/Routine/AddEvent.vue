<template>
  <div v-if="showAdd" class="backdrop" @click="cancel"></div>
  <form @submit.prevent="validation" class="Box">
    <dialog class="MessageContainer" open v-if="showAdd">
      <textarea
        v-model.trim="eventContent"
        class="addEvent"
        type="text"
        placeholder="請輸入要新增的事件內容"
      ></textarea>
      <div v-if="!isValidation && !eventContent" class="hint">請輸入要新增的事件內容</div>
      <div>
        <VueDatePicker
          mode-height="110"
          v-model="time"
          cancelText="取消"
          selectText="確認"
          show-now-button
          time-picker
          inline
          placeholder="點選此處選擇時間"
          arrow-navigation
        ></VueDatePicker>
      </div>
      <div v-if="!isValidation && !time" class="hint">請由上面選取時間並點擊確認</div>
      <div class="pickTimeBox">
        <div class="pick-p">選取的時間 :</div>
        <div v-if="time" class="pickTime">{{ getHour }} : {{ getMin }}</div>
      </div>

      <div class="buttonBox">
        <base-button @click="cancel">取消</base-button>
        <base-button @click="confirmAdd">新增</base-button>
      </div>
    </dialog>
  </form>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  emits: ["cancel-add", "confirm-add"],
  props: {
    showAdd: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      eventContent: "",
      time: 0,
      isValidation: true,
    };
  },
  computed: {
    getHour() {
      const hour = this.time.hours;
      if (hour < 10) {
        return "0" + hour;
      } else {
        return String(hour);
      }
    },
    getMin() {
      const minutes = this.time.minutes;
      if (minutes < 10) {
        return "0" + minutes;
      } else {
        return String(minutes);
      }
    },
  },
  methods: {
    cancel() {
      this.eventContent = "";
      this.time = "";
      this.isValidation = true;
      this.$emit("cancel-add");
    },
    validation() {
      if (!this.eventContent || !this.time) {
        this.isValidation = false;
        return false;
      } else {
        return true;
      }
    },

    confirmAdd() {
      if (!this.validation()) {
        return;
      }
      this.$emit("confirm-add", this.eventContent, this.time);
      this.cancel();
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.624);
}

.Box {
  display: flex;
  align-items: center;
  /* position: fixed;
  z-index: 10;
  max-width: 5rem; */
}

.MessageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 20%;
  margin: 0 auto;
  z-index: 20;
  width: 350px;
  min-height: 50vh;
  border-radius: 20px;
}

.addEvent {
  display: block;
  width: 83%;
  height: 3.5rem;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 16px;
  font-size: 1rem;
}
.buttonBox {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.pickTimeBox {
  /* display: block; */
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
  font-size: 1.25rem;
  width: 70%;
}

.hint {
  display: flex;
  justify-content: center;
  color: red;
}

.pick-p {
  display: flex;
  justify-content: center;
  width: 8rem;
}
.pickTime {
  display: flex;
  justify-content: center;
  width: 8rem;
  color: rgb(28, 65, 215);
}
</style>
