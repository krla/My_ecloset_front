<template>
  <div>
    <h1 class="font-weight-thin" align="center">Mi armario</h1>
    <h3 class="font-weight-thin" align="center" justify="center">Guarda tu nueva prenda o accesorio</h3>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>

          <v-text-field v-model="img" :rules="imgRules" label="Imagen" required></v-text-field>

          <v-select
            v-model="type"
            :items="types"
            :rules="[v => !!v || 'El tipo de prenda es requerido']"
            label="Tipo de prenda"
            required
          ></v-select>

          <v-select
            v-model="season"
            :items="seasons"
            :rules="[v => !!v || 'La temporada es requerida']"
            label="Temporada"
            required
          ></v-select>
        </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="4">
        <v-card-actions>
          <v-btn :disabled="!valid" dark color="#13978F" class="button" @click="addCloth()">Guardar</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from '../services/Api'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Se requiere un nombre para la prenda'],
    img: '',
    imgRules: [v => !!v || 'Se requiere una imagen de la prenda'],
    type: null,
    types: [
      'blusas',
      'camisetas',
      'chaqueta',
      'abrigo',
      'rebecas',
      'jersey',
      'pullover',
      'vaqueros',
      'pantalon',
      'falda',
      'vestido',
      'short',
      'zapatos',
      'camisa',
      'polo',
      'sombrero',
      'otros'
    ],
    season: null,
    seasons: ['primavera-verano', 'otoño-invierno', 'todas']
  }),

  methods: {
    addCloth () {
      const cloth = {
        name: this.name,
        img_url: this.img,
        cloth_type: this.type,
        season: this.season
      }
      Api.addCloth(cloth).then(() => {
        this.$router.push('/closet')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin: auto;
  margin-top: 10px;
}
</style>
