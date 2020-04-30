<template>
  <div>
    <v-img :src="clothObject.img_url" height="100px" width="100px" @click="selectthisCloth">
    </v-img>
  </div>
</template>

<script>
export default {
  name: 'cloth',
  props: {
    clothObject: Object
  },
  methods: {
    selectthisCloth () {
      this.$emit('selectCloth', this.clothObject._id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
