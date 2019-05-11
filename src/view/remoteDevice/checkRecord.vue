<template>
  <div class="check-record">
    <div class="title">
      调试记录
    </div>
    <div class="record-content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background: '#eee'}"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="使用机型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="system"
          label="操作系统"
          width="120">
        </el-table-column>
        <el-table-column
          prop="size"
          label="屏幕尺寸"
          width="120">
        </el-table-column>
        <el-table-column
          prop="resolut"
          label="分辨率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="useTime"
          label="使用时常"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="50"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageNo: 1,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.total = 10;
    this.tableData = [
      {
        type: 'TYN-843',
        system: 'IOS',
        size: '6.4',
        resolut: '1080*3430',
        startTime: '2019-02-23',
        endTime: '2019-02-23 16:22',
        useTime: '6分钟',
      },
      {
        type: 'TYN-843',
        system: 'IOS',
        size: '6.4',
        resolut: '1080*3430',
        startTime: '2019-02-23',
        endTime: '2019-02-23 16:22',
        useTime: '6分钟',
      },
    ]
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val;

    },
    handleClick(row) {
      this.$router.push('/remote/remoteDetail');
    },
  },
}
</script>
<style>
.check-record .el-table--border td,
.check-record .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: none;
}
.check-record .el-pagination {
  text-align: right;
  padding-top: 20px;
  padding-bottom: 30px;
}
</style>
