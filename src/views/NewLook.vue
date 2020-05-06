<template>
  <div>
    <h1 class="font-weight-thin" align="center">Mis looks</h1>
    <h3 class="font-weight-thin" align="center" justify="center">Crea un nuevo look, o utiliza esta herramienta para guardar en un look todas aquellas prendas y accesorios que te quieres llevar en tu próximo viaje!</h3>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" label="Nombre" required></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="4">
        <h3 class="font-weight-thin" align="center" justify="center">Una vez le des a guardar, verás la tarjeta del look creada. Podrás añadir o eliminar cuantas prendas y accesorios quieras, enjoy!</h3>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-card-actions>
          <v-btn :disabled="!valid" dark color="#B0BEC5" class="button" @click="createLook()">Guardar</v-btn>
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
    name: ''
  }),

  methods: {
    createLook () {
      const look = {
        name: this.name
      }
      Api.createLook(look).then((newLook) => {
        this.$router.push(`/editlook/${newLook._id}`)
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
