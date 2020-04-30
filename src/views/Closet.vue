<template>
  <div>
    <v-card style="height: 700px;">
      <v-container>
        <v-row>
          <v-col v-for="(cloth, idx) in clothes" :key="idx">
            <Cloth :clothObject="cloth" v-on:selectCloth="deleteCloth" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card color="#9E9C9C">
      <v-card-text style="height: 100px; position: relative">
        <v-btn absolute dark fab top left color="#13978F" to="/addcloth">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn absolute dark fab top right color="#13978F" @click="deleteClothId()" :disabled="showRemove">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Api from '../services/Api'
import Cloth from '../components/ClothCard'

export default {
  name: 'Closet',
  data () {
    return {
      clothes: [],
      clothToRemove: []
    }
  },
  computed: {
    showRemove () {
      return this.clothToRemove.length === 0
    }
  },
  components: {
    Cloth
  },
  created () {
    Api.getAllClothes().then(res => {
      this.clothes = res
    })
  },
  methods: {
    deleteCloth (clothId) {
      const idx = this.clothToRemove.findIndex(id => id === clothId)
      if (idx === -1) {
        this.clothToRemove.push(clothId)
      } else {
        this.clothToRemove.splice(idx, 1)
      }
    },
    deleteClothId () {
      Api.deleteCloth(this.clothToRemove).then(() => {
        Api.getAllClothes().then(res => {
          this.clothes = res
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
