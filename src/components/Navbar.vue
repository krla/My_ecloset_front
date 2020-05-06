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
            <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/home">Inicio</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/closet" style="height:50px">Mi armario</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/looks" style="height:50px">Mis looks</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/profile" style="height:50px">Mi perfil</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-list-item-action class="link" @click="logOut()" style="height:50px">Cerrar sesión</v-list-item-action>
            </v-list-item-title>
          </v-list-item>
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
.link {
  text-decoration: none;
  color: black;
}
</style>
