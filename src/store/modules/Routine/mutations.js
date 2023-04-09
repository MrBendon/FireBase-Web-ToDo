export default {
  toggleEvent(state, id) {
    const theEvent = state.RoutineData.find((el) => el.id === id);
    theEvent.isFinish = !theEvent.isFinish;
  },
  deleteEvent(state, id) {
    state.RoutineData = state.RoutineData.filter((el) => el.id !== id);
  },
  addNewEvent(state, obj) {
    state.RoutineData.push(obj);
  },
  getAllData(state, obj) {
    state.RoutineData = obj;
  },
  clearState(state) {
    state.RoutineData = [];
  },
};
