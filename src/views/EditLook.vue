<template>
  <div>
    <v-container>
      <v-row v-if="wardrobe" align="center" justify="center">
        <v-col align="center">
          <v-btn @click="openWardrobe()">Abrir armario</v-btn>
        </v-col>
      </v-row>
      <v-row v-else align="center" justify="center">
        <v-col align="center">
          <v-btn @click="openWardrobe()">Ver look</v-btn>
        </v-col>
      </v-row>
      <v-row v-show="!wardrobe">
        <v-col>
          <LookCloset :clothes="clothes" :look="look.clothes" v-on:addCloth="addToLook" />
        </v-col>
      </v-row>
    </v-container>
    <v-card v-show="wardrobe">
      <v-card-title class="title">
        {{look.name}}
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(cloth, idx) in look.clothes"
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
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="3">
            <v-card-actions>
             <v-btn small fab dark id="deleteBtn" color="red" @click="deleteClothId()">
               <v-icon>mdi-delete</v-icon>
             </v-btn>
            </v-card-actions>
          </v-col>

          <v-col cols="3">
            <v-card-actions>
              <v-btn small fab dark id="saveBtn" color="#13978F" @click="editLook()">
                <v-icon>mdi-content-save</v-icon>
             </v-btn>
           </v-card-actions>
          </v-col>
       </v-row>
      </v-container>
    </v-card>
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
      arrayToDelete: []
    }
  },
  components: {
    LookCloset
  },
  created () {
    Api.getAllClothes().then(res => { this.clothes = res })
    Api.getOneLook(this.$route.params.id).then(res => { this.look = res })
  },
  methods: {
    addToLook (clothToAdd) {
      this.look.clothes.push(clothToAdd)
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
      this.look.clothes = this.look.clothes.filter(cloth =>
        !this.arrayToDelete.includes(cloth._id))
      this.arrayToDelete = []
    },
    editLook () {
      Api.saveLook(this.look._id, this.look).then(() => {
        this.$router.push('/looks')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  background-color: #13978F;
  color: white;
}
#deleteBtn {
  position: absolute;
  bottom: 20px;
}
#editBtn {
  position: absolute;
  bottom: 20px;
}
#saveBtn {
  position: absolute;
  bottom: 20px;
}
.on {
  border: 1px solid red;
}
</style>
