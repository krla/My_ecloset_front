<template>
  <div class="closet">
    <v-card style="height: 700px;">
      <v-container>
        <v-row>
          <v-col cols="9" sm="6" md="4">
            <v-autocomplete
            v-model="types"
            :items="clothesTypes"
            outlined
            dense
            chips
            small-chips
            label=""
            multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-btn @click="filterclothes()"><v-icon>mdi-magnify</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(cloth, idx) in clothes" :key="idx">
            <Cloth :clothObject="cloth" v-on:selectCloth="deleteCloth" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-btn dark fab class="BtnPlus" color="#13978F" to="/addcloth">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn dark fab class="BtnDelete" color="red" @click="deleteClothId()" :disabled="showRemove">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
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
      clothToRemove: [],
      clothesTypes: ['blusas', 'camisetas', 'chaqueta', 'abrigo', 'rebecas', 'jersey', 'pullover', 'vaqueros', 'pantalon', 'falda', 'vestido', 'short', 'zapatos', 'camisa', 'polo', 'sombrero', 'otros'],
      types: []
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
    },
    filterclothes () {
      if (this.types) {
        Api.getClothesByType(this.types).then(res => {
          this.clothes = res
        }
        )
      } else {
        Api.getAllClothes().then(res => {
          this.clothes = res
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.BtnPlus {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.BtnDelete {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

</style>
