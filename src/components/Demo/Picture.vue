<template>
  <div style="overflow: hidden">
    <img :src="propValue">
  </div>
</template>

<script>
export default {
  name: 'PictureDemo',
  props: {
    propValue: {
      type: String,
      require: true,
    },
  },
}
</script>
