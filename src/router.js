import { createRouter, createWebHistory } from "vue-router";

//pageName
import LogInPage from "./components/pages/Auth/LogIn.vue";
import SignUpPage from "./components/pages/Auth/SignUp.vue";
import WorkSpacePage from "./components/pages/WorkSpace.vue";
import ToDoListPage from "./components/pages/Todo/ToDoList.vue";
import RoutineListPage from "./components/pages/Routine/RoutineList.vue";
import NotFound from "./components/pages/NotFound.vue";
import ForgetPW from "./components/pages/Auth/ForgetPw.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LogInPage },
    { path: "/login", redirect: "/" },

    { path: "/forget", component: ForgetPW },
    { path: "/signup", component: SignUpPage },
    {
      path: "/workspace/:id",
      component: WorkSpacePage,
      children: [
        { path: "todolist", component: ToDoListPage },
        { path: "routinelist", component: RoutineListPage },
      ],
    },

    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
