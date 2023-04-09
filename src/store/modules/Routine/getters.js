export default {
  getStateData(state) {
    const newObj = state.RoutineData.sort(function (a, b) {
      if (a.hours === b.hours) {
        return a.minutes - b.minutes;
      } else {
        return a.hours - b.hours;
      }
    });
    return newObj;
  },
};
