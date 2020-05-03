<template>
  <div>
    <v-card>
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
                  class="grey lighten-2"
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
        </v-container>
        <v-row>
          <v-col cols="4" align="center">
        <v-card-actions>
          <v-btn small fab dark id="deleteBtn" color="red" @click="deleteLook()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>

          </v-col>
          <v-col cols="4">
        <v-card-actions>
          <v-btn small fab dark id="editBtn" color="#13978F" to="/lookcloset">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>

          </v-col>
          <v-col cols="4">
        <v-card-actions>
          <v-btn small fab dark id="saveBtn" color="#13978F" @click="editLook()">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
  </div>
</template>

<script>
import Api from '../services/Api'
export default {
  data () {
    return {
      look: {}
    }
  },
  mounted () {
    Api.getOneLook(this.$route.params.id).then(res => (this.look = res))
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
</style>
