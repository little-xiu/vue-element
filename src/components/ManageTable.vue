<template>
  <div class="table-wrap">
    <el-table
      :data="dataSource"
      style="width: 100%"
      :header-cell-style="{background: '#f7f8fa'}"
      @sort-change="handleSort"
      max-height="250">
      <el-table-column
        prop="name"
        label="名称"
        type="expand"
        width="120">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本号"
        sortable
        width="130">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="测试任务创建时间"
        width="220">
      </el-table-column>
      <el-table-column
        prop="plat"
        label="平台"
        width="130">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="125">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="测试任务完成时间"
        width="220">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.status === 'DOING'">
            <el-button type="text" @click="viewReport(scope.$index, scope.row)">查看报告</el-button>
          </template>
          <template v-if="scope.row.status === 'DONE'">
            <el-button
              class="table-btn"
              @click.native.prevent="handleOperate(scope.$index, scope.row)"
              type="text"
              size="small">
              配置
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap">
      <el-pagination
        @current-change="handleCurrentChange"  
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="400">
      </el-pagination>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'manage-table',
  props: ['dataSource'],
  data () {
    return {

    }
  },
  methods: {
    handleOperate (index, row) {
      // console.log(index, row);
      // 非父子组件dialog.vue监听this.$center.$on
      this.$center.$emit('onConfig', row.name);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSort (column, prop, order) {
      console.log(column, prop, order)
    },
    viewReport(index, row) {
      // 存储一下全局变量
      this.$store.dispatch('setTask', {
        id: row.id,
        name: row.name,
        version: row.version,
      });
      this.$router.push({path: '/testtabs', query: {id: row.id}});
    },
  }
}
</script>
<style lang="less">
.table-wrap {
  .el-table {
    border: 1px solid #eaecf1;
  }
  .el-table__body-wrapper {
    .el-table__row {
      &:hover td {
        background: #fff;
      }
    }
  }
  .el-table td, .el-table th {
    padding: 3px 8px;
  }
  .el-table {
    th {
      position: static;
      &:after {
        content: "";
        position: absolute;
        top: 10px;
        width: 1px;
        height: 26px;
        background: #eaecf1;
        z-index: 100;
      }
    }
    th:last-child {
      &:after {
        background: transparent;
      }
    }
  }
  .el-button--text {
    color: #fd5720;
    &:hover {
      color: #fd5720;
    }
  }
  .el-pagination {
    text-align: right;
    margin-top: 40px;
    .btn-prev {
      margin-right: 5px;
    }
    .btn-next {
      margin-left: 5px;
    }
    .btn-prev, .btn-next {
      height: 30px;
      padding: 0 18px;
      border: 1px solid #eaecf1;
    }
    .number {
      border: 1px solid #eaecf1;
      margin: 0 5px;
      height: 30px;
      line-height: 30px;
      color: #424656;
    }
    .active {
      background-color: #3e475f;
      border: 1px solid #3e475f;
      margin: 0 5px;
      color: #fff;
    }
    .el-pagination__editor.el-input .el-input__inner {
      height: 30px;
      width: 32px;
    }
  }
}
</style>
