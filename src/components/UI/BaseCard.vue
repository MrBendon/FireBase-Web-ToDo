<template>
  <section class="card" :class="CardCssName">
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    CardCssName: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.card {
  background-color: white;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16); */
  padding: 0.75rem 1rem 0rem 1rem;
  margin: 0rem auto;
  border-radius: 1rem;
  min-height: 3.5rem;
  max-width: 414px;

  /* max-height: 896px; */
}

.loginPage,
.SignUpPage {
  min-height: 600px;
}

.workspace {
  margin: 1rem auto;
  /* height: 95vh; */
}

.todolistItem {
  /* background-color: rgba(239, 244, 248, 0.5); */
  margin: 1rem auto;
  transition: all 0.15s ease-out;
}
.todolistItem:hover {
  background-color: rgb(176, 207, 233);
}

.routineItem {
  margin: 1rem auto;
  /* background-color: rgba(239, 244, 248, 0.5); */
  transition: all 0.15s ease-out;
}
.routineItem:hover {
  background-color: rgb(176, 207, 233);
  /* border: 1px solid grey; */
}

.spinnerBox {
  height: 600px;
}

.listLoading {
  height: 400px;
}

.about {
  height: 420px;
  width: 350px;
  background-image: linear-gradient(rgb(101, 104, 100), rgb(18, 19, 18));
}
</style>
