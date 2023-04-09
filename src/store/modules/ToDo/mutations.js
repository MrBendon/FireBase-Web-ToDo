export default {
  clearState(state) {
    state.todoData = [];
  },
  fetchData(state, obj) {
    state.todoData = obj.reverse();
  },
  deleteEvent(state, id) {
    state.todoData = state.todoData.filter((el) => el.id !== id);
  },
  addEvent(state, newEvent) {
    state.todoData.unshift(newEvent);
  },
};
