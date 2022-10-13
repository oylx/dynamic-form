<template>
  <el-form
    class="dynamic-form"
    :inline="formConfig.inline"
    :model="value"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :size='formConfig.size'
    :status-icon="formConfig.statusIcon">
    <template v-for="item in formConfig.formItemList">
      <dynamic-form-item
        v-if="value[item.key] !== undefined"
        :key="item.key"
        :item="item"
        :value="value[item.key]"
        @input="handleInput($event, item.key)"/>
    </template>


  </el-form>
</template>

<script>
import DynamicFormItem from '@/components/DynamicForm/FormItem'

export default {
  name: 'DynamicForm',
  components: { DynamicFormItem },
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    columnMinWidth: {
      type: String
    }
  },
  mounted() {
    this.setDefaultValue()
  },
  methods: {
    setDefaultValue() {
      const formData = { ...this.value }
      this.formConfig?.formItemList.forEach(item => {
        const { key, value } = item
        if ([undefined, null].includes(formData[key])) {
          formData[key] = value
        }
      })
      this.$emit('input', { ...formData })
    },
    handleInput(val, key) {
      // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', { ...this.value, [key]: val })
    },
  }
}
</script>

<style scoped>

</style>
