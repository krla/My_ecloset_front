<template>
  <div>
    {{ clothes }}
  </div>
</template>

<script>
import Api from "../services/Api";

export default {
  name: "Closet",
  data() {
    return {
      clothes: []
    };
  },
  components: {},
  created() {
    Api.getAllClothes().then(res => {
      this.clothes = res;
    });
  }
};
</script>

<style lang="scss" scoped></style>
