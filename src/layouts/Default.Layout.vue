<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'default',

  components: {
    Navbar
  }
}
</script>

<style scoped>
</style>
