<template>
    <dynamic-form :form-config="formConfig" v-model="formData" />
</template>

<script>
import formConfig from './config.json'
export default {
  name: 'DynamicIndex',
  data() {
    return {
      formConfig,
      formData: {
        gender: '0',
        name: 'seven'
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>
