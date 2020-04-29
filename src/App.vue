<template>
  <component :is="layout">

  </component>
</template>

<script>
export default {
  name: "App",

  computed: {
    layout() {
      return (this.$route.meta.layout || 'default')
    }
  }
};
</script>
