<template>
  <div class="closet">
    <v-card>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-autocomplete
            v-model="types"
            :items="clothesTypes"
            outlined
            dense
            chips
            small-chips
            label="Filtra tus prendas y accesorios"
            multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
              <v-col cols="10">
                <v-autocomplete
                  v-model="season"
                  :items="seasons"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Busca por temporada"
                ></v-autocomplete>
              </v-col>
        </v-row>
        <v-row>
          <v-col v-for="(cloth, idx) in filtered" :key="idx">
            <Cloth class="ml-5" :clothObject="cloth" v-on:selectCloth="addClothToLook" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Cloth from '../components/ClothCardLook'

export default {
  name: 'Closet',
  data () {
    return {
      clothesTypes: ['Abrigos', 'Blusas', 'Camisas', 'Camisetas', 'Chaquetas', 'Faldas', 'Jerseys', 'Pantalones', 'Polos', 'Pullovers', 'Rebecas', 'Shorts', 'Sombreros', 'Vaqueros', 'Vestidos', 'Zapatos', 'Otros'],
      types: [],
      seasons: ['primavera-verano', 'otoño-invierno'],
      season: ''
    }
  },
  props: {
    clothes: Array
  },
  components: {
    Cloth
  },
  computed: {
    lookIds () {
      return this.clothes
        ? this.clothes.filter(c => c.isSelected === true) : []
    },
    filtered () {
      let filterC = this.clothes
      if (this.types.length !== 0) {
        filterC = filterC.filter(cloth => this.types.includes(cloth.cloth_type))
      }

      if (this.season) {
        filterC = filterC.filter(cloth => this.season === cloth.season)
      }
      return filterC
    }
  },
  methods: {
    addClothToLook (cloth) {
      this.$emit('addCloth', cloth)
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
