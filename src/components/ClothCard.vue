<template>
  <div>
    <v-img :src="clothObject.img_url" height="100px" width="100px">
    </v-img>
  </div>
</template>

<script>
  export default {
    name: "cloth",
    props:{
      clothObject: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>