<template>
  <div class="home-page">
    <div class="title-wrap">
      <span class="left">应用管理</span>
      <span class="right" @click="uploadApp">上传APP</span>
    </div>
    <div class="main-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
          <manage-table 
            :dataSource="tableData"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <modify-dialog :visible="modifyVisible" @closeDialog="closeDialog"/>
    <app-detail :visible="detailVisible" @onClose="onClose" @onOpen="onOpen"/>
  </div>
</template>
<script>
import dialog from '@/components/uploadDialog'
import detail from '@/components/detail'
import ManageTable from '@/components/ManageTable'
const tabData = [
  {
    label: '待启动',
    name: 'first'
  },
  {
    label: '待审核',
    name: 'second'
  },
  {
    label: '审核中',
    name: 'third'
  },
  {
    label: '进行中',
    name: 'fourth'
  },
  {
    label: '已完成',
    name: 'fifth'
  },
  {
    label: '全部',
    name: 'sixth'
  },
];
export default {
  components: {
    'modify-dialog': dialog,
    'manage-table': ManageTable,
    'app-detail': detail,
  },
  data () {
    return {
      detailVisible: false,
      modifyVisible: false,
      tabList: tabData,
      activeName: 'first',
      tableData: [{
          name: 'HRX',
          version: '安卓8.0',
          startTime: '2016-05-03',
          plat: 'xx',
          status: 'DOING',
          endTime: '2018-12-11',
          id: 'aabb11',
        }, {
          name: 'HRX2',
          version: '安卓8.3',
          startTime: '2016-05-03',
          plat: 'xx',
          status: 'DONE',
          endTime: '2018-12-11',
          id: 'aabb22',
        },
      ]
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.index)
    },
    uploadApp () {
      this.modifyVisible = true;
    },
    closeDialog () {
      this.modifyVisible = false;
    },
    onClose () {
      this.detailVisible = false;
    },
    onOpen () {
      this.detailVisible = true;
    }
  }
}
</script>
<style lang="less">
 .home-page {
   width: 1146px;
   margin: 0 auto;
   .title-wrap {
     padding: 0 48px 0 30px;
     display: flex;
     justify-content: space-between;
     border-bottom: 1px solid #eee;
     margin-bottom: 20px;
     .left {
       font-size: 14px;
        height: 20px;
        line-height: 20px;
        margin-top: 17px;
        margin-bottom: 20px;
     }
     .right {
        margin-top: 15px;
        padding: 6px 20px;
        font-size: 12px;
        color: #fff;
        background: #424656;
        border-radius: 2px;
        height: 17px;
        cursor: pointer;
     }
   }
   .el-table__header-wrapper {
     background: #ccc;
   }
   .el-tabs__nav-wrap::after {
     background-color: transparent; 
   }
   .el-tabs__item.is-active {
     color: #fd5720;
   }
   .el-tabs__active-bar {
     background-color: #fd5720;
   }
   .el-tabs__item:hover {
     color: #fd5720;
   }
   .main-content {
    padding-left: 30px;
    padding-right: 49px;
    padding-bottom: 40px;
   }
 }
</style>

