<template>
  <v-container class="home">
    <Navbar :disable="true" />
    <v-row class="mt-2" align="center" justify="center">
      <v-col cols="10" sm="6">
        <h3
            class="subtitle-1 font-weight-thin mt-10"
            align="center"
            justify="center"
          >Accede a tu armario para ver todas tus prendas y accesorios, o añadir uno nuevo</h3>
        <v-card elevation="10" color="#E5E5E5">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img :aspect-ratio="16/9" src="../assets/closet.jpg">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal display-3 black--text"
                    style="height: 100%;"
                  >
                    <v-btn large dark color="blue-grey" to="/closet">Mi armario</v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-2" align="center" justify="center">
      <v-col cols="10" sm="6">
        <h3
            class="subtitle-1 font-weight-thin mt-10"
            align="center"
            justify="center"
          >Accede a tus looks guardados o crea uno</h3>
        <v-card elevation="10" color="#E5E5E5">
          <v-hover v-slot:default="{ hover }">
            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img :aspect-ratio="16/9" src="../assets/looks.jpg">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal display-3 black--text"
                    style="height: 100%;"
                  >
                    <v-btn large dark color="blue-grey" to="/looks">Mis looks</v-btn>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #ECEFF1;
  height: 120vh;
  width: 100vw;
  background-size: cover;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
