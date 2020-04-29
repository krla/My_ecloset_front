<template>
  <div class="home">
    <v-row>
      <v-col align="center">
        <v-btn to="/closet" class="btn" color="#13978F" dark>Mi Armario</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn to="/looks" class="btn" color="#13978F" dark>Looks</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn to="/newlook" class="btn" color="#13978F" dark>Crear Look</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style lang='scss' scoped>
.home {
  margin-top: 20vh;
}
.btn {
  margin-top: 40px;
  width: 110px;
  height: 50px;
}
</style>
