<template>
  <base-card class="itemOutSide" :CardCssName="'todolistItem'">
    <div class="itemBox">
      <div class="checkBox">
        <input type="checkbox" :id="id" :checked="isFinish" @change="toggleCheck(id)" />
        <!-- <span class="checkmark"></span> -->
      </div>
      <label :for="id" class="eventBox" :class="{ Finish: isFinish }">{{ event }}</label>

      <base-button class="deleteBox" :ButtonCssMode="'delete'" @click="deleteCheck(id)"></base-button>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["delete-check"],
  props: ["id", "event", "isFinish"],
  data() {
    return {
      goUpdate: false,
    };
  },
  methods: {
    updateEventName(id, isFinish) {
      // console.log(id, isFinish);
      this.$store.dispatch("ToDoModule/UpdateEventName", { id, isFinish });
    },
    toggleCheck(id) {
      this.$store.dispatch("ToDoModule/toggleState", id);
    },
    deleteCheck(id) {
      // console.log(id);
      this.$emit("delete-check", id);
    },
  },
};
</script>

<style scoped>
.itemBox {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.itemOutSide {
  transition: all 0.15s ease-out;
}
.itemOutSide:hover {
  transform: translateY(-2px);
}

.eventBox {
  width: 75%;
  margin: 0 1rem;
}

input[type="checkbox"] {
  background-color: #fff;
  /* appearance: none; */
  margin: 0;
  /* color: currentColor; */
  width: 1.35rem;
  height: 1.35rem;
  border: 0.1rem solid black;
  border-radius: 1.5rem;
  transform: translateY(0.15rem);
  cursor: pointer;
}

.Finish {
  text-decoration: line-through;
  color: gray;
}
</style>
