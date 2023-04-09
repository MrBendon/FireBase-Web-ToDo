<template>
  <base-card :CardCssName="'routineItem'">
    <div class="itemBox">
      <div class="checkBox">
        <input type="checkbox" :checked="isFinish" :id="id" @click="toggle(id)" />
      </div>
      <label :class="{ Finish: isFinish }" class="eventBox" :for="id"
        >{{ HourToString }} : {{ MinutesToString }}&thinsp; {{ eventName }}</label
      >
      <base-button @click="deletecheck(id)" :ButtonCssMode="'delete'"></base-button>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["toggle", "delete-check"],
  props: ["id", "eventName", "eventHours", "eventMinutes", "isFinish"],
  computed: {
    HourToString() {
      if (this.eventHours < 10) {
        return "0" + this.eventHours;
      } else {
        return this.eventHours;
      }
    },
    MinutesToString() {
      if (this.eventMinutes < 10) {
        return "0" + this.eventMinutes;
      } else {
        return this.eventMinutes;
      }
    },
  },
  methods: {
    toggle(id) {
      //   console.log(id);
      this.$store.dispatch("RoutineModule/toggleEvent", id);
    },
    deletecheck(id) {
      // console.log(id);
      this.$emit("delete-check", id);
    },
    fetchListData() {},
  },
};
</script>

<style scoped>
.itemBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.75rem;
}

input[type="checkbox"] {
  background-color: #fff;
  /* appearance: none; */
  margin: 0;
  /* color: currentColor; */
  width: 1.35rem;
  height: 1.35rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  transform: translateY(0.15rem);
  cursor: pointer;
}

.eventBox {
  width: 75%;
  margin: 0 1rem;
}
.Finish {
  text-decoration: line-through;
  color: gray;
}
</style>
