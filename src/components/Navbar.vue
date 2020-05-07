<template>
  <div id="navbar">
    <v-app-bar color="blue-grey" dark app>
      <v-btn icon>
        <v-icon @click="back()">mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="title font-weight-thin">My eCloset</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/home">Inicio</v-list-item>

          <v-list-item to="/closet">Mi armario</v-list-item>

          <v-list-item to="/looks">Mis looks</v-list-item>

          <v-list-item to="/profile">Mi perfil</v-list-item>

          <v-list-item @click="logOut()">Cerrar sesión</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    logOut () {
      localStorage.clear()
      this.$router.push('/')
    },
    back () {
      this.$router.go('-1')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
