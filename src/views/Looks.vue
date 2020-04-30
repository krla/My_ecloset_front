<template>
  <div>
    <div v-if="looks">
      <v-container >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4" v-for="(look, idx) in looks" :key="idx">
              <Look  :look="look" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h2>No tienes looks, añade uno!</h2>
    </div>

    <v-col align="center">
      <v-btn fab dark color="#13978F" to="/addcloth">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
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
  }
}
</script>

<style lang="scss" scoped>
</style>
