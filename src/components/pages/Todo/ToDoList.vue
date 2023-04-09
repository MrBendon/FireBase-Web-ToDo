<template>
  <base-dialog
    :showDialog="!!showDialog"
    @cancel-delete="canceldelete"
    @delete="deleteEvent"
    :id="id"
  ></base-dialog>
  <!-- <base-spinner v-if="getisInProgress"></base-spinner> -->
  <section>
    <div class="line"></div>
    <div>
      <input class="addEvent" type="text" placeholder="新增待辦事項" v-model.trim.lazy="newEvent.eventName" />
      <base-button :ButtonCssMode="'add'" @click="add">+</base-button>
      <transition name="addalert" mode="out-in">
        <div v-if="!isValidation" class="addAlert">請輸入事項名稱</div>
        <div v-else class="addAlert">&nbsp;</div>
      </transition>
    </div>

    <!-- <ul> -->
    <!-- <base-spinner :CardCssName="'listLoading'" v-if="isLoading"></base-spinner> -->
    <div v-if="noEvent" class="blank">添加新的事項吧</div>
    <transition-group name="ul" tag="ul">
      <to-do-item
        @delete-check="deletecheck"
        v-for="item in GetList"
        :key="item.id"
        :id="item.id"
        :event="item.eventName"
        :isFinish="item.isFinish"
      >
      </to-do-item>
    </transition-group>
    <!-- </ul> -->
  </section>
</template>

<script>
import ToDoItem from "./ToDoItem.vue";
export default {
  components: {
    ToDoItem,
  },
  data() {
    return {
      id: 0,
      isLoading: false,
      showDialog: false,
      isValidation: true,
      newEvent: {
        id: 0,
        eventName: "",
        isFinish: false,
      },
    };
  },
  computed: {
    getisInProgress() {
      return this.$store.getters["AuthModule/getInProgress"];
    },
    GetList() {
      return this.$store.getters["ToDoModule/getData"];
    },
    noEvent() {
      if (this.$store.getters["ToDoModule/getData"].length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    add() {
      this.isValidation = true;
      if (!this.newEvent.eventName) {
        this.isValidation = false;
        return;
      }
      const newEventItem = {
        id: new Date().getTime(),
        eventName: this.newEvent.eventName,
        isFinish: this.newEvent.isFinish,
      };

      this.$store.dispatch("ToDoModule/setData", newEventItem);
      this.newEvent.id = 0;
      this.newEvent.eventName = "";
    },
    deletecheck(id) {
      this.id = id;
      this.showDialog = true;
    },
    canceldelete() {
      this.showDialog = false;
      this.id = 0;
    },
    async deleteEvent(id) {
      await this.$store.dispatch("ToDoModule/deleteData", id);
      this.canceldelete();
    },
    async fetchData() {
      await this.$store.dispatch("ToDoModule/getData");
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // console.log("mounted ! ");
    this.fetchData();
    this.$store.dispatch("AuthModule/changeIsLoading", false);
    // console.log("beforeUpdate ! remove all click");
    // window.removeEventListener("click", this.onClick);
  },
  unmounted() {
    // console.log("unmounted ! remove all click");
    this.$store.dispatch("AuthModule/changeIsLoading", true);
    window.removeEventListener("click", this.onClick);
  },
};
</script>

<style scoped>
section {
  min-height: 380px;
  padding-bottom: 1rem;
}
.line {
  border: 1px solid rgb(168, 168, 168);
  margin: 1.5rem 0;
}
.addEvent {
  width: 83%;
  height: 3.25rem;
  margin: 0rem 1rem 0 0;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 1rem;
}

.addAlert {
  height: 14px;
  margin: 0 auto 0.1rem auto;
  color: rgb(196, 27, 27);
  text-align: center;
  font-size: 14px;
}

.blank {
  height: 250px;
  margin: 0rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(175, 175, 175);
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
  transition: all 0.3s ease-in-out;
}

.ul-leave-active {
  transition: all 0.3s ease-in-out;
}

.ul-move {
  transition: all 1s ease-in-out;
}

.addalert-enter-from {
  opacity: 0;
  transform: translateY(-3px);
}
.addalert-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.addalert-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.addalert-leave-to {
  opacity: 0;
  transform: translateY(3px);
}
.addalert-enter-active,
.addalert-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
