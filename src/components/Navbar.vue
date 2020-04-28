<template>
  <div id="navbar">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
        right
        height="300"
      >
        <v-list dense>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-action><router-link class="link" to="/closet">Mi armario</router-link></v-list-item-action>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-action><router-link class="link" to="/looks">Mis looks</router-link></v-list-item-action>
            </v-list-item-content>
          </v-list-item>

           <v-list-item link>
            <v-list-item-content>
              <v-list-item-action><router-link class="link" to="/newlook">Crear look</router-link></v-list-item-action>
            </v-list-item-content>
          </v-list-item>

           <v-list-item link>
            <v-list-item-content>
              <v-list-item-action><router-link class="link" to="/profile">Perfil</router-link></v-list-item-action>
            </v-list-item-content>
          </v-list-item>

           <v-list-item link>
            <v-list-item-content>
              <v-list-item-action class="link" @click="logOut()">Cerrar sesión</v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        app
        color="#9E9C9C"
        dark
      >
        <v-spacer />

        <v-toolbar-title></v-toolbar-title>

        <v-spacer />

        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-app-bar>
    </v-app>

  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
    methods:{
      logOut() {
      localStorage.clear();
      this.$router.push("/");
    }
    }
  }
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: black
}
</style>