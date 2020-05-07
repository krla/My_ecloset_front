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
            @change="filterClothesByTypeAndSeason()"
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
                  @change="filterClothesByTypeAndSeason()"
                ></v-autocomplete>
              </v-col>
            </v-row>
        <v-row>
          <v-col v-for="(cloth, idx) in clothes" :key="idx">
            <Cloth class="ml-5" :clothObject="cloth" :isSelected="lookIds.includes(cloth._id)" v-on:selectCloth="addClothToLook" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Api from '../services/Api'
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
    clothes: Array,
    look: Array
  },
  components: {
    Cloth
  },
  computed: {
    lookIds () {
      if (this.look) return this.look.map(cloth => cloth._id)
      else return []
    }
  },
  methods: {
    addClothToLook (cloth) {
      this.$emit('addCloth', cloth)
    },
    filterClothesByTypeAndSeason () {
      Api.getAllClothes(this.types, this.season).then(res => {
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
