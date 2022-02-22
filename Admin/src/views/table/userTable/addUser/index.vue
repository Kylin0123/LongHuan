<template>
  <div class="app-container">
    暂时不支持新建用户
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
        image: ''
      }
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

