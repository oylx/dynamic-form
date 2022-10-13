<template>
  <el-form-item
    :label="item.label"
    :prop="item.key"
    :class="{'block':item.block}">
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      v-on="$listeners"
      :type="item.subtype"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      :readonly="item.readonly"
      :autosize="item.autosize"></el-input>

    <el-select
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      v-on="$listeners"
      :multiple="item.multiple"
      :disabled="item.disabled"
      :multiple-limit="item.multipleLimit">
      <el-option
        v-for="o in item.options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled">
      </el-option>
    </el-select>
    <el-radio-group
      v-else-if="item.type==='radio-group'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        v-for="o in item.options"
        :is="item.button?'el-radio-button':'el-radio'"
        :key="o.value"
        :label="o.value"
        :disabled="o.disabled"
        :border="item.border"
      >{{ o.label }}
      </component>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: 'DynamicFormItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {}
}
</script>

<style scoped>

</style>
