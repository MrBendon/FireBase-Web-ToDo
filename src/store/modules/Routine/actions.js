import { db } from "../../../FireBase.js";
import { collection, query, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";

export default {
  async toggleEvent(context, id) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    const Alldata = context.getters.getStateData;
    const theEventBoolean = Alldata.find((el) => el.id === id).isFinish;
    const ref = doc(db, `${UserId}/RoutineDataset/dataset`, `${id}`);
    await updateDoc(ref, {
      isFinish: !theEventBoolean,
    });
    // context.commit("toggleEvent", id);
  },
  async deleteEvent(context, id) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    await deleteDoc(doc(db, `${UserId}/RoutineDataset/dataset`, `${id}`));
    context.commit("deleteEvent", id);
  },
  async addNewEvent(context, obj) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    await setDoc(doc(db, `${UserId}/RoutineDataset/dataset`, `${obj.id}`), obj);
    // db.collection(`${UserId}/RoutineDataset/dataset`).orderBy("hours");
    // context.commit("addNewEvent", obj);
  },
  async getAlldata(context) {
    const UserId = context.rootGetters["AuthModule/getUserId"];
    // console.log(UserId);
    const ref = query(collection(db, `${UserId}/RoutineDataset/dataset`));
    onSnapshot(ref, (docs) => {
      let array = [];
      docs.forEach((doc) => {
        const data = doc.data();
        array.push(data);
      });

      context.commit("getAllData", array);
    });
  },
  async RenewAllDataToNotFinish(context) {
    // console.log("renew...");
    const UserId = context.rootGetters["AuthModule/getUserId"];
    const Alldata = context.getters.getStateData;
    const AlldataIncludesId = Alldata.map((el) => Object.entries(el).filter((el) => el.includes("id")));
    const IdArray = AlldataIncludesId.flat(2).filter((el) => el !== "id");
    IdArray.forEach((el) => {
      const ref = doc(db, `${UserId}/RoutineDataset/dataset`, `${el}`);
      updateDoc(ref, {
        isFinish: false,
      });
    });
    // const theEventBoolean = Alldata.find((el) => el.id === id).isFinish;
    //   Alldata.forEach(data=>{

    //   })
    //   const ref = doc(db, `${UserId}/RoutineDataset/dataset`, `${id}`);
    //   await updateDoc(ref, {
    //     isFinish: !theEventBoolean,
    //   });
    // },
    // reStart(context) {
    //   const batch = writeBatch(db);
    //   const Ref = doc(db, `${UserId}/RoutineDataset/dataset`);
  },
  async clearState(context) {
    context.commit("clearState");
  },
};
