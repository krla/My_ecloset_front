<template>
  <div class="closet">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
            v-model="types"
            :items="clothesTypes"
            outlined
            dense
            chips
            small-chips
            label="Filtra tus prendas y accesorios"
            multiple
            @change="filterClothesByType()"
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
      clothesTypes: ['blusas', 'camisetas', 'chaqueta', 'abrigo', 'rebecas', 'jersey', 'pullover', 'vaqueros', 'pantalon', 'falda', 'vestido', 'short', 'zapatos', 'camisa', 'polo', 'sombrero', 'otros'],
      types: []
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
