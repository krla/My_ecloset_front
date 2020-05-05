<template>
  <div>
    <v-card>
      <v-card-title class="title">{{look.name}}</v-card-title>
      <v-container fluid>
        <v-row>
          <v-col v-for="(cloth, idx) in look.clothes" :key="idx" class="d-flex child-flex" cols="6">
            <v-card flat tile class="d-flex" >
              <v-img :src="cloth.img_url" aspect-ratio="1" class="grey lighten-2">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
          <v-card v-if="look.clothes.length == 0" height="10vh">
            <h3 class="font-weight-thin" align="center" justify="center">Añade prendas a tu look</h3>
            </v-card>
        </v-row>
      </v-container>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-card-actions>
              <v-btn small fab dark id="deleteBtn" color="red" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </template>
          <v-card>
            <v-card-title class="headline">¿Estás seguro?</v-card-title>
            <v-card-text>Eliminarás el look</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="green darken-1" text @click="deleteLook()">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-card-actions>
        <v-btn small fab dark id="editBtn" color="#13978F" @click="editLook()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'cloth',
  data () {
    return {
      dialog: false
    }
  },
  props: {
    look: Object
  },
  methods: {
    deleteLook () {
      this.$emit('deleteLook', this.look._id)
      this.dialog = false
    },
    editLook () {
      this.$router.push(`/EditLook/${this.look._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  background-color: #13978f;
  color: white;
}
#deleteBtn {
  position: absolute;
  left: 100px;
  bottom: 20px;
}
#editBtn {
  position: absolute;
  right: 100px;
  bottom: 20px;
}
</style>
