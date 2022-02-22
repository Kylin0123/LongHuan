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
      <el-table-column label="openid">
        <template slot-scope="scope">
          {{ scope.row.openid }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender? "男":"女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信号">
        <template slot-scope="scope">
          <span>{{ scope.row.wxId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个人介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.personalInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已参加课程" width="110" align="center">
        <template slot-scope="scope">
          <el-button @click="queryLessonForUser(scope.row.openid)">查询</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteUser(scope.row.openid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserAll, deleteUser, queryLessonForUser } from '@/api/user'

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
      getUserAll().then(res => {
        this.list = res.data.users
        this.listLoading = false
      })
    },
    deleteUser(openid) {
      deleteUser({openid}).then(res => {
        this.$message("删除用户成功!")
        this.fetchData()
      })
    },
    queryLessonForUser(openid) {
      queryLessonForUser({openid}).then(res => {
        this.$message("查询用户成功!")
        let lessons = res.data.lessons
        let showText = "<div>目前该用户已参加课程:<br/>"
        for(var i=0; i < lessons.length; i++) {
          if(lessons[i] != null){
            showText += lessons[i].name + '<br/>'
          }
        }
        showText += "</div>"
        this.$alert(showText, '查询结果', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          center: true
        });
      })
    }
  }
}
</script>
