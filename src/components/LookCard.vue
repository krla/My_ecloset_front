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
        <v-card-actions>
          <v-btn small fab dark id="deleteBtn" color="red" @click="deleteLook()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
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
  props: {
    look: Object
  },
  methods: {
    deleteLook () {
      this.$emit('deleteLook', this.look._id)
    },
    editLook () {
      this.$router.push(`/EditLook/${this.look._id}`)
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
  left: 100px;
  bottom: 20px;
}
#editBtn {
  position: absolute;
  right: 100px;
  bottom: 20px;
}
</style>
