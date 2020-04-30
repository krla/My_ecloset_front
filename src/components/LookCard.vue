<template>
  <div>
    <v-card class="ma-8" id="card"  light elevation="0"  height="60vh">
      <v-card-title class="headline mb-5 margin text-center cardTitle">
        {{ look.name }}
      </v-card-title>
      <v-card-text class="d-flex">
        <v-img  v-for="(cloth, idx) in look.clothes" :key="idx" :src="cloth.img_url" height="100px" width="100px" class="mb-6"></v-img>
        <v-btn fab dark id="deleteBtn" color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn fab dark id="editBtn" color="#13978F">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'cloth',
  props: {
    look: Object
  }
}
</script>

<style lang="scss" scoped>
.cardTitle {
  background-color:#13978F;
  color: white;
}
#deleteBtn {
  position: absolute;
  left: 10px;
  bottom: 20px;
}
#editBtn {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
</style>
