<template>
  <button class="v-button">{{ propValue }}</button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    propValue: {
      type: String,
      default: '',
    },
  },
}
</script>
