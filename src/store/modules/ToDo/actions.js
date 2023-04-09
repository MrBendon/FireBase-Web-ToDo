import { db } from "../../../FireBase.js";
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

// import { getDocs } from "firebase/firestore";

export default {
  async setData(context, addObj) {
    // console.log("Set data");
    const UserId = await context.rootGetters["AuthModule/getUserId"];

    const ref = doc(db, `${UserId}/todoDataset/dataset`, `${addObj.id}`);
    setDoc(ref, addObj);
    context.commit("addEvent", addObj);
  },
  async getData(context) {
    //////////////////////////////////////////
    const UserId = context.rootGetters["AuthModule/getUserId"];
    // console.log(UserId);
    /////     get all docs in a collection with realtime update  ////
    const ref = query(collection(db, `${UserId}/todoDataset/dataset`));
    onSnapshot(ref, (docs) => {
      let array = [];
      // console.log(docs);
      docs.forEach((doc) => {
        const data = doc.data();
        array.push(data);
      });
      // console.log(array);
      // console.log("Fetch done.");
      context.commit("fetchData", array);
    });
  },
  async deleteData(context, id) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    await deleteDoc(doc(db, `${UserId}/todoDataset/dataset`, `${id}`));

    // context.commit("deleteEvent", id);
  },
  async toggleState(context, id) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    const AllData = context.getters.getData;
    const theEventBoolean = AllData.find((el) => el.id === id).isFinish;
    // console.log("UserId:", UserId, theEventBoolean);
    const eventRef = doc(db, `${UserId}/todoDataset/dataset`, `${id}`);
    await updateDoc(eventRef, {
      isFinish: !theEventBoolean,
    });
    // context.commit("toggleState", id);
  },
  async UpdateEventName(_, payload) {
    // console.log("update");
    if (payload.isFinish) {
      // console.log("The Event already done.");
      return;
    }
    // console.log(context, payload);
  },
  async clearState(context) {
    context.commit("clearState");
  },
};
