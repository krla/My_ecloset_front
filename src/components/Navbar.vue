<template>
  <div id="navbar">
    <v-app-bar color="#9E9C9C" dark>
      <v-toolbar-title>{{ this.$route.meta.appBarTitle || "My eCloset"}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-spacer></v-spacer>

    <v-navigation-drawer v-model="drawer" absolute  right app temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/closet">Mi armario</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/looks">Mis looks</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/newlook">Crear look</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link" to="/profile">Mi perfil</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-list-item-action class="link" @click="logOut()">Cerrar sesión</v-list-item-action>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: black;
}
.v-application--wrap {
  min-height: 0vh;
}
</style>
