<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="realId">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Num">
        <template slot-scope="scope">
          {{ scope.row.residualNum }} / {{ scope.row.totalNum }}
        </template>
      </el-table-column>
      <el-table-column label="Price">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="Desc">
        <template slot-scope="scope">
          {{ scope.row.descInfo }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="50" label="Image">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="50" height="50"/>
        </template>
      </el-table-column>

      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="modifyLesson(scope.$index, scope.row.id)" >修改</el-button>
          <el-button @click="deleteLesson(scope.$index, scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import { getLessonAll, deleteLesson } from '@/api/lesson'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getLessonAll().then(res => {
        this.list = res.data.lessons
        this.listLoading = false
      })
    },
    modifyLesson(index, id) {
      this.$message("暂不支持修改，请删除后重新添加")
    },
    deleteLesson(index, id) {
      deleteLesson({id}).then(res => {
        this.$message("删除成功！")
        this.fetchData()
      })
    }
  }
}
</script>
