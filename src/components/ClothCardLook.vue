<template>
  <div>
    <v-img :src="clothObject.img_url" height="100px" class="clothImg"
    :class="{on: isSelected || selected}" width="100px" @click="selectthisCloth()">
    </v-img>
  </div>
</template>

<script>
export default {
  name: 'cloth',
  data () {
    return {
      selected: false
    }
  },
  props: {
    clothObject: Object,
    isSelected: Boolean
  },
  methods: {
    selectthisCloth () {
      if (!this.isSelected) {
        console.log('hola')
        this.selected = !this.selected
        this.$emit('selectCloth', this.clothObject)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.on {
  border: 2px solid #263238;
}
.clothImg:hover {
  outline: 1px solid rgb(255, 201, 201)
}
</style>
