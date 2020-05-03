<template>
  <div class="closet">
    <h1 class="font-weight-thin" align="center">Mi armario</h1>
    <h3 class="font-weight-thin" align="center" justify="center">Elige las prendas y accesorios que desea agregar a su look</h3>
    <v-card>
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
            <v-btn @click="filterClothesByType()"><v-icon>mdi-magnify</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(cloth, idx) in clothes" :key="idx">
            <Cloth class="ml-5" :clothObject="cloth"/>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-btn fixed dark fab class="BtnPlus" color="#13978F" @click="$router.go(-1)">
      <v-icon>mdi-plus</v-icon>
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
      clothesTypes: ['blusas', 'camisetas', 'chaqueta', 'abrigo', 'rebecas', 'jersey', 'pullover', 'vaqueros', 'pantalon', 'falda', 'vestido', 'short', 'zapatos', 'camisa', 'polo', 'sombrero', 'otros'],
      types: []
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
    filterClothesByType () {
      Api.getAllClothes(this.types).then(res => {
        this.clothes = res
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
