<template>
  <v-container class="home">
    <h1 class="font-weight-thin" id="title" align="center">My eCloset</h1>
    <v-row class="mt-5" align="center" justify="center" >
      <v-col cols="11" sm="6" md="4">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-img
              :aspect-ratio="16/9"
              src="../assets/armario.jpg"
            >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal display-3 black--text"
                style="height: 100%;"
              >
                <v-btn dark color="blue-grey" to="/closet">Mi armario</v-btn>
              </div>
            </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="mt-5" align="center" justify="center">
      <v-col cols="11" sm="6" md="4">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-img
              :aspect-ratio="16/9"
              src="../assets/looks.jpg"
            >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out blue-grey lighten-4 v-card--reveal display-3 black--text"
                style="height: 100%;"
              >
                <v-btn dark color="blue-grey" to="/looks">Mis looks</v-btn>
              </div>
            </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #E5E5E5;
  height: 100vh;
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
