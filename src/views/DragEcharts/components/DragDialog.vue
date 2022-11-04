<!--
 * @description 流程管理--角色表单
 * @date 2020-09-13
 * @author lism
-->
<template>
  <el-dialog
    class="remind-dialog"
    v-bind="$attrs"
    :title="title"
    width="400px"
    top="20vh"
    v-on="$listeners"
    @confirm="_confirm"
    @cancle="_cancle"
  >
    <el-form
      ref="form"
      :model="form"
      class="role-dialog-class"
      :rules="rules"
    >
      <el-form-item label="长" prop="width">
        <el-input v-model="form.width" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="高" prop="height">
        <el-input v-model="form.height" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="左" prop="left">
        <el-input v-model="form.left" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="上" prop="top">
        <el-input v-model="form.top" placeholder="请输入"/>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'DragDialog',
  data() {
    return {
      form: {},
      rules: {
        width: [
          { required: true, message: '长度不能为空', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '高度不能为空', trigger: 'blur' }
        ],
        left: [
          { required: true, message: '距左不能为空', trigger: 'blur' }
        ],
        top: [
          { required: true, message: '距上不能为空', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    title() {
      return `编辑${this.$attrs.rowdata?.chartData?.title?.text || '-'}`
    }
  },
  watch: {
    '$attrs.visible': function (val) {
      // 打开弹窗，先把表单清空
      if (val) {
        this.init()
      } else {
        this.reset()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.form = this.$attrs.rowdata
    },
    reset() {
      this.$refs.form && this.$refs.form.clearValidate()
    },
    // 提交
    _confirm() {

    },
    _cancle() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
.remind-dialog {
  .table {
    margin-bottom: 32px;

    .remind-name {
      width: 60px;
      display: inline-block;
    }
  }
}
</style>
