import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      todoData: [
        // { id: 1, eventName: "買晚餐", isFinish: false },
        // { id: 2, eventName: "買電腦", isFinish: false },
        // { id: 3, eventName: "領錢", isFinish: true },
      ],
    };
  },
  actions,
  mutations,
  getters,
};
