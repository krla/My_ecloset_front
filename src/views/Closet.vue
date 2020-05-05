<template>
  <div class="closet">
    <v-row>
      <v-col>
        <h1 class="font-weight-thin" align="center">Mi armario</h1>
        <h3 class="font-weight-thin" align="center" justify="center">Disfruta de tu vestidor virtual</h3>
      </v-col>
    </v-row>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
          <v-card>
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-autocomplete
                  v-model="types"
                  :items="clothesTypes"
                  outlined
                  dense
                  chips
                  small-chips
                  label="Busca por categoría"
                  multiple
                  @change="filterClothesByType()"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="(cloth, idx) in clothes" :key="idx">
                <Cloth class="ml-5" :clothObject="cloth" v-on:selectCloth="deleteCloth" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn fixed dark fab class="BtnPlus" color="#FBC02D" to="/addcloth">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn fixed dark fab class="BtnDelete" color="#E57373" v-on="on" :disabled="showRemove">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">¿Estás seguro?</v-card-title>
          <v-card-text>Eliminarás la prenda de tu armario</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="deleteClothId()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
      clothesTypes: [
        'Abrigos',
        'Blusas',
        'Camisas',
        'Camisetas',
        'Chaquetas',
        'Faldas',
        'Jerseys',
        'Pantalones',
        'Polos',
        'Pullovers',
        'Rebecas',
        'Shorts',
        'Sombreros',
        'Vaqueros',
        'Vestidos',
        'Zapatos',
        'Otros'
      ],
      types: [],
      dialog: false
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
      this.dialog = false
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
  left: 60px;
  bottom: 50px;
}
.BtnDelete {
  right: 60px;
  bottom: 50px;
}
</style>
