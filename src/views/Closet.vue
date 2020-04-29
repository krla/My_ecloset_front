<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="(cloth, idx) in clothes" :key="idx">
          <Cloth :clothObject="cloth"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from "../services/Api";
import Cloth from "../components/ClothCard"

export default {
  name: "Closet",
  data() {
    return {
      clothes: []
    };
  },
  components: {
    Cloth
  },
  created() {
    Api.getAllClothes().then(res => {
      this.clothes = res;
    });
  }
};
</script>

<style lang="scss" scoped></style>
