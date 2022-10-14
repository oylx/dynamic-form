<template>
  <button class="v-button">{{ propValue }}</button>
</template>

<script>
export default {
  name: 'ButtonDemo',
  props: {
    propValue: {
      type: String,
      default: '',
    },
  },
}
</script>
