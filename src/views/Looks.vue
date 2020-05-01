<template>
  <div>
    <h1 class="font-weight-thin" align="center">Mis looks</h1>
    <h3 class="font-weight-thin" align="center" justify="center">¿Un evento importante? Tranquil@ que aquí tienes todos tus looks guardados o puedes crearte uno. Good look!</h3>
    <div v-if="looks">
      <v-container >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" v-for="(look, idx) in looks" :key="idx">
              <Look  :look="look" v-on:deleteLook="deleteLook" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h2>No tienes looks, añade uno!</h2>
    </div>

      <v-btn fixed fab dark class="BtnPlus" color="#13978F" to="/newlook">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

  </div>
</template>

<script>
import Api from '../services/Api'
import Look from '@/components/LookCard.vue'
export default {
  data () {
    return {
      looks: []
    }
  },
  components: {
    Look
  },
  created () {
    Api.getAllLooks().then(res => {
      this.looks = res
    })
  },
  methods: {
    deleteLook (lookId) {
      Api.deleteLook(lookId).then(() => {
        Api.getAllLooks().then(res => {
          this.looks = res
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.BtnPlus {
  left: 20px;
  bottom: 20px;
}
</style>
