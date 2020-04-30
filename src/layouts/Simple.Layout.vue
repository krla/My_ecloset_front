<template>
  <v-app class="bg-simple">
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'simple'
}
</script>

<style scoped>
.bg-simple {
  background-image: url("../assets/fondo_auth.png");
  height: 100vh;
  width: 100vw;
  background-size: cover;
}
</style>
