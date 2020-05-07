<template>
  <div class="addCloth">
    <v-alert v-if="alert" type="error">Falta algún campo por rellenar</v-alert>
    <v-row>
      <v-col>
        <h1 class="font-weight-thin" align="center">Mi armario</h1>
        <h3
          class="font-weight-thin"
          align="center"
          justify="center"
        >Guarda tu nueva prenda o accesorio</h3>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <p
            class="font-weight-ligth"
            align="center"
            justify="center"
          >Añade una foto de tu prenda o accesorio</p>
          <input type="file" accept="image/*" @change="onFileSelected" />
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :rules="nameRules" label="Nombre" required></v-text-field>

          <v-select
            class="mt-5"
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
          <v-btn :disabled="!valid" dark color="#B0BEC5" class="button" @click="addCloth()">Guardar</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from '../services/Api'
import firebase from 'firebase'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Se requiere un nombre para la prenda'],
    // imgRules: [v => !!v || 'Se requiere una imagen de la prenda'],
    type: '',
    types: [
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
    season: '',
    seasons: ['primavera-verano', 'otoño-invierno', 'todas'],
    selectedFile: '',
    alert: false
  }),

  methods: {
    onFileSelected (cloth) {
      this.selectedFile = cloth.target.files[0]
    },
    uploadImage () {
      return new Promise(resolve => {
        var storageRef = firebase.storage().ref()
        var metadata = {
          contentType: 'image/jpeg'
        }
        var uploadTask = storageRef
          .child('images/' + this.selectedFile.name)
          .put(this.selectedFile, metadata)
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          error => console.log(error),
          async function () {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
            resolve(downloadURL)
          }
        )
      })
    },
    async addCloth () {
      if (this.name === '' || this.selectedFile === '' || this.type === '' || this.season === '') {
        this.alert = true
      } else {
        this.alert = false
        const imgURL = await this.uploadImage()
        const cloth = {
          name: this.name,
          img_url: imgURL,
          cloth_type: this.type,
          season: this.season
        }
        Api.addCloth(cloth).then(() => {
          this.$router.push('/closet')
        })
      }
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
