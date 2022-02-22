<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="课程总人数">
        <el-input v-model="form.totalNum" type="number"/>
      </el-form-item>
      <el-form-item label="课程剩余人数">
        <el-input v-model="form.residualNum" type="number"/>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="form.descInfo" type="textarea" />
      </el-form-item>
      
      <el-form-item label="标题">
        <el-radio-group v-model="form.title">
          <el-radio label="新品"/>
          <el-radio label="火热"/>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item prop="image">
          <span>图片：</span>
          <el-input v-if="false" v-model="form.image" />
          <el-upload
            ref="upload"
            :show-file-list="false"
            class="upload-demo"
            action=""
            :limit="1"
            :multiple="true"
            :before-upload="beforeupload"
            :auto-upload="false"
            :on-change="handleChange"
            :data="form"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <img v-if="form.image" :src="form.image" alt="" style="width:50%; height:50%;">
          </el-upload>
        </el-form-item>
        -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { saveOrUpdateLesson } from '@/api/lesson'

export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        totalNum: 0,
        residualNum: 0,
        price: '',
        descInfo: '',
        title: '',
        image: ''
      }
    }
  },
  methods: {
    onSubmit() {
      saveOrUpdateLesson(this.form).then(res => {
        this.$message('提交成功!')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // 阻止upload的自己上传，进行再操作
    handleChange(file, fileList) {
      this.form.image = URL.createObjectURL(file.raw)
    // var files = this.addForm.image
    // files.push(this.addForm.image)
    },
    beforeupload(file) {
      return true
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

