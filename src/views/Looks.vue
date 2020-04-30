<template>
  <div>
    <div v-if="looks">
      <v-carousel cycle continuous progress color="#DDD" height="80vh;">
        <v-carousel-item  v-for="(look, idx) in looks" :key="idx">
          <v-sheet color="white">
            <Look  :look="look" />
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div v-else>
      <h2>No tienes looks, añade uno!</h2>
    </div>

    <v-btn fab dark id="addBtn" color="#13978F" to="/addcloth">
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
      looks: [],
      bottomNav: 'addCloth'
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

#addBtn {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>
