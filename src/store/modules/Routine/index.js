import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      RoutineData: [
        // {
        //   id: 1,
        //   eventName: "買早餐",
        //   hours: 8,
        //   minutes: 0,
        //   isFinish: true,
        // },
        // {
        //   id: 2,
        //   eventName: "運動",
        //   hours: 9,
        //   minutes: 0,
        //   isFinish: false,
        // },
        // {
        //   id: 3,
        //   eventName: "洗澡",
        //   hours: 10,
        //   minutes: 1,
        //   isFinish: false,
        // },
        // {
        //   id: 4,
        //   eventName: "上課",
        //   hours: 14,
        //   minutes: 30,
        //   isFinish: false,
        // },
      ],
    };
  },
  actions,
  mutations,
  getters,
};
