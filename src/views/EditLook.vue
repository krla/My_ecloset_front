<template>
  <div>
    <h1 class="font-weight-thin" align="center">Edita tu Look</h1>
    <h3
      class="font-weight-thin"
      align="center"
      justify="center"
    >Aquí podrás añadir prendas al look desde tu armario, eliminarlas y guardar el look con los cambios realizados</h3>
    <v-container>
      <v-row v-if="wardrobe" align="center" justify="center">
        <v-col align="center">
          <v-btn color="#B0BEC5" dark @click="openWardrobe()">Abrir armario</v-btn>
        </v-col>
      </v-row>
      <v-row v-else align="center" justify="center">
        <v-col align="center">
          <v-btn color="#B0BEC5" dark @click="openWardrobe()">Ver look</v-btn>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-show="!wardrobe">
        <v-col cols="12" sm="8">
          <LookCloset :clothes="clothes" v-on:addCloth="addToLook" />
        </v-col>
      </v-row>
    </v-container>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6">
        <v-card v-show="wardrobe">
          <v-card-title class="title font-weight-thin">{{look.name}}</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(cloth, idx) in selected"
                :key="idx"
                class="d-flex child-flex"
                cols="6"
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="cloth.img_url"
                    aspect-ratio="1"
                    @click="deleteCloth(cloth._id)"
                    :class="{on: arrayToDelete.includes(cloth._id)}"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="3">
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-card-actions>
                      <v-btn small fab dark id="deleteBtn" color="#E57373" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </template>
                  <v-card>
                    <v-card-title class="headline">¿Estás seguro?</v-card-title>
                    <v-card-text>Eliminarás la prenda</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#78909C" text @click="dialog = false">Cancelar</v-btn>
                      <v-btn color="#78909C" text @click="deleteClothId()">Eliminar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="3">
                <v-card-actions>
                  <v-btn small fab dark id="saveBtn" color="#FFA726" @click="editLook()">
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from '../services/Api'
import LookCloset from '@/components/LookCloset.vue'
export default {
  data () {
    return {
      look: {},
      clothes: [],
      wardrobe: true,
      selectedToDelete: false,
      arrayToDelete: [],
      dialog: false
    }
  },
  components: {
    LookCloset
  },
  computed: {
    selected () {
      return this.clothes
        ? this.clothes.filter(c => c.isSelected === true) : []
    }
  },
  created () {
    Api.getAllClothes().then(clothes => {
      Api.getOneLook(this.$route.params.id).then(look => {
        this.look = look
        clothes = clothes.map(c => ({ isSelected: false, ...c }))

        look.clothes.forEach(l => {
          clothes.forEach(c => {
            if (c._id === l._id) c.isSelected = true
          })
        })
        this.clothes = clothes
      })
    })
  },
  methods: {
    addToLook (clothToAdd) {
      this.clothes.forEach(c => {
        if (c._id === clothToAdd._id) c.isSelected = true
      })
    },
    openWardrobe () {
      this.wardrobe = !this.wardrobe
    },
    deleteCloth (clothId) {
      const idx = this.arrayToDelete.findIndex(id => id === clothId)
      if (idx === -1) {
        this.arrayToDelete.push(clothId)
      } else {
        this.arrayToDelete.splice(idx, 1)
      }
    },
    deleteClothId () {
      this.clothes.forEach(c => {
        if (this.arrayToDelete.includes(c._id)) c.isSelected = false
      })

      this.arrayToDelete = []
      this.dialog = false
    },
    editLook () {
      this.look.clothes = this.clothes
        .filter(c => c.isSelected === true)
        .map(c =>
          ({
            _id: c._id,
            name: c.name,
            img_url: c.img_url,
            user: c.user,
            cloth_type: c.cloth_type,
            season: c.season
          })
        )
      Api.saveLook(this.$route.params.id, this.look).then(() => {
        this.$router.push('/looks')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  background-color: #90A4AE;
  color: white;
}
#deleteBtn {
  position: absolute;
  bottom: 20px;
}
#saveBtn {
  position: absolute;
  bottom: 20px;
}
.on {
  border: 1px solid #455A64;
}
</style>
