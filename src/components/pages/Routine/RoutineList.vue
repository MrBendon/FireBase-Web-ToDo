<template>
  <base-dialog
    :showDialog="!!showDialog"
    :id="id"
    @cancel-delete="cancel"
    @delete="deleteEvent(id)"
  ></base-dialog>

  <section>
    <div class="line"></div>
    <!-- <div v-if="noEvent" class="blank">添加新事件吧</div> -->

    <transition-group name="ul" tag="ul">
      <routine-item
        @delete-check="check"
        v-for="data in getlistData"
        :key="data.id"
        :id="data.id"
        :eventName="data.eventName"
        :eventHours="data.hours"
        :eventMinutes="data.minutes"
        :isFinish="data.isFinish"
      ></routine-item>
    </transition-group>
    <div class="ButtonBox">
      <base-button class="addButton" @click="addnewEventButton" :ButtonCssMode="'addRuntineEvent'"
        >+ Add New Event</base-button
      >
      <base-button
        class="addButton"
        :ButtonCssMode="'renew'"
        @click="GoCheckRenew"
        :showRenewCheck="!!showRenewCheck"
        >Renew All Event</base-button
      >
    </div>
    <add-event :showAdd="!!showAdd" @cancel-add="cancel" @confirm-add="add"></add-event>
    <renew-comfirm v-if="showRenewCheck" @cancel-renew="cancel" @renew="renew"></renew-comfirm>
  </section>
</template>

<script>
import RoutineItem from "../Routine/RoutineItem.vue";
import AddEvent from "./AddEvent.vue";
import RenewComfirm from "./RenewComfirm.vue";

export default {
  components: { RoutineItem, AddEvent, RenewComfirm },
  data() {
    return {
      id: 0,
      showDialog: false,
      showAdd: false,
      showRenewCheck: false,
      newEvent: {
        id: 0,
        eventName: "",
        hours: 0,
        minutes: 0,
        isFinish: false,
      },
    };
  },
  computed: {
    getlistData() {
      return this.$store.getters["RoutineModule/getStateData"];
    },
  },
  methods: {
    GoCheckRenew() {
      this.showRenewCheck = true;
    },
    check(id) {
      this.id = id;
      this.showDialog = true;
    },
    cancel() {
      this.id = 0;
      this.showDialog = false;
      this.showAdd = false;
      this.showRenewCheck = false;
    },
    async deleteEvent(id) {
      // console.log(id);
      await this.$store.dispatch("RoutineModule/deleteEvent", id);
      this.cancel();
    },
    addnewEventButton() {
      this.showAdd = true;
    },
    add(content, time) {
      const newEventObj = {
        id: new Date().getTime(),
        eventName: content,
        hours: time.hours,
        minutes: time.minutes,
        isFinish: false,
      };
      // console.log(newEventObj);
      // add to store
      this.$store.dispatch("RoutineModule/addNewEvent", newEventObj);
    },
    async fetchData() {
      await this.$store.dispatch("RoutineModule/getAlldata");
    },
    async renew() {
      await this.$store.dispatch("RoutineModule/RenewAllDataToNotFinish");
      this.cancel();
    },
  },
  created() {
    // console.log("created !  fetch ....");
    // this.fetchData();
    // console.log("fetch done ! ");
  },
  mounted() {
    this.$store.dispatch("AuthModule/changeIsLoading", false);
    this.fetchData();
    window.removeEventListener("click", this.onClick);
  },
  unmounted() {
    this.$store.dispatch("AuthModule/changeIsLoading", true);
    window.removeEventListener("click", this.onClick);
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  position: relative;
  min-height: 380px;
  padding-bottom: 1rem;
}

.line {
  border: 1px solid rgb(168, 168, 168);
  margin: 1.5rem 0;
}

.ButtonBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem 0;
}

.ul-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.ul-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.ul-enter-to,
.ul-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.ul-enter-active {
  transition: all 2s ease-out;
}

.ul-leave-active {
  transition: all 2s ease-in;
}

.ul-move {
  transition: all 2s ease-in-out;
}
</style>
