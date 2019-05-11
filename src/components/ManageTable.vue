<template>
  <div class="table-wrap">
    <el-table
      :data="dataList"
      v-loading="loading"
      style="width: 100%"
      :header-cell-style="{background: '#f7f8fa'}"
      @sort-change="handleSort"
    >
      <el-table-column
        v-if="activeItem === 'READY' || activeItem === '5'"
        prop="name"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本号"
        sortable
      >
      </el-table-column>
      <el-table-column
        v-if="activeItem === 'DOING' || activeItem === '5'"
        prop="startTime"
        label="测试任务创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="plat"
        label="平台"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        width="350px"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.status }}</span>
        <span class="steps-wrap">
          <ul class="steps">
            <li class="stepItem"
              v-for="(item, index) in steps"
              :key="index"
              :class='statusCls(item, index)'
              @click="onStepClick(item, index)"
            >
              <span class="line"></span>
              <span class="dot">
                <span class="text">{{item.name}}</span>
              </span>
            </li>
          </ul>
        </span>
      </template>
      </el-table-column>
      <el-table-column
        v-if="activeItem === 'DONE' || activeItem === '5'"
        prop="endTime"
        label="测试任务完成时间"
      >
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <template v-if="scope.row.status === '进行中'">
            <el-button type="text" @click="viewReport(scope.$index, scope.row)">查看报告</el-button>
          </template>
          <template v-else-if="scope.row.status === '待审核'">
            <el-button type="text" @click="toConfirm(scope.$index, scope.row)">审核</el-button>
          </template>
          <template v-else-if="scope.row.status === '已完成'">
            <el-button
              class="table-btn"
              @click.native.prevent="handleOperate(scope.$index, scope.row)"
              type="text"
              size="small">
              配置
            </el-button>
          </template>
          <template v-else>
            <span @click="toConfirm(scope.$index, scope.row)">查看</span>
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
    <div style="width: 80%;paddingLeft: 20px;">
      <el-steps :class="[stepClass]" :active="1" finish-status="success">
        <el-step title="步骤 1" ></el-step>
        <el-step title="步骤 2" ></el-step>
        <el-step title="步骤 3" ></el-step>
        <el-step title="步骤 4" ></el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
export default {
  name: 'manage-table',
  props: ['dataSource', 'activeName', 'loadFlag'],
  data () {
    return {
      stepClass: 'self-steps',
      dataList: this.dataSource,
      activeItem: this.activeName,
      loading: this.loadFlag,
      steps: [
        {
          name: '设备准备',
          index: 0,
        },
        {
          name: '运行检测',
          index: 1,
        },
        {
          name: '错误分析',
          index: 2,
        },
        {
          name: '结果复核',
          index: 3,
        },
      ],
      undoneSteps: ['运行检测', '错误分析', '结果复核'],
      doneSteps: ['设备准备'],
      curStepIndex: 1,
    }
  },
  watch: {
    dataSource(val) {
      this.dataList = val;
    },
    activeName(val) {
      this.activeItem = val;
    },
    loadFlag(val) {
      this.loading = val;
    }
  },
  methods: {
    statusCls(item, index) {
      // cur done undone
      if (this.curStepIndex === index) {
        return 'cur';
      } else if (this.undoneSteps.indexOf(item.name) !== -1) {
        return 'undone';
      } else if (this.doneSteps.indexOf(item.name) !== -1) {
        return 'done';
      }
    },
    onStepClick(item, index) {
      this.curStepIndex = index;
    },
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
    toConfirm(index, row) {
      const obj = {
        id: row.id,
        name: row.name,
        version: row.version,
      };
      // 设置面包屑导航名称本地存储
      localStorage.setItem('saveTask', JSON.stringify(obj));
      this.$router.push({path: '/testtabs/check', query: {id: row.id}});
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
  .el-table td {
    padding: 3px 8px;
  }
   .el-table th {
     padding: 8px 8px;
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
  .steps-wrap {
    float: right;
  }
}
.steps {
  width: 230px;
  height: 30px;
  padding-left: 26px;
  display: flex;
  .stepItem {
    position: relative;
    flex: auto;
    &:last-child {
      .line {
        background: #fff;
      }
    }
    .dot {
      position: relative;
      display: inline-block;
      margin-bottom: 6px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
    }
    .line {
      position: absolute;
      top: 6px;
      left: 6px;
      height: 2px;
      width: 92%;
    }
    .text {
      position: absolute;
      z-index: 100;
      width: 100px;
      height: 30px;
      left: -25px;
      top: 9px;
      font-size: 10px;
      color: #ccc;
    }
  }
  .undone {
    .dot {
      border: 1px solid #ccc;
    }
    .line {
      background: #ccc;
    }
    .text {
      color: #ccc;
    }
  }
  .done {
    .dot {
      border: 1px solid #fd5720;;
    }
    .line {
      background: #fd5720;
    }
  }
  .cur {
    .dot {
      width: 8px;
      height: 8px;
      border: 1px solid #fd5720;
      top: 2px;
      background: #fd5720;
    }
    .line {
      background: #ccc;
    }
    .text {
      color: #fd5720;
    }
  }
}
</style>
