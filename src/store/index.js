import { createStore } from "vuex";
import ToDoModule from "./modules/ToDo/index.js";
import RoutineModule from "./modules/Routine/index.js";
import Auth from "./modules/storeAuth.js";

const store = createStore({
  modules: {
    ToDoModule: ToDoModule,
    RoutineModule: RoutineModule,
    AuthModule: Auth,
  },
  state() {
    return {
      userId: "",
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
  },
});

export default store;
