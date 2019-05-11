<template>
  <div class="home-page">
    <div class="title-wrap">
      <span class="left">应用管理</span>
      <span class="right" @click="uploadApp">上传APP</span>
    </div>
    <div class="main-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name" >
          <manage-table 
            :dataSource="tableData"
            :activeName="activeName"
            :loadFlag="loadFlag"
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
import http from '@/service/http';
const tabData = [
  {
    label: '待启动',
    name: 'READY'
  },
  {
    label: '待审核',
    name: 'TO_CONFIRM'
  },
  {
    label: '审核中',
    name: 'CONFIRM'
  },
  {
    label: '进行中',
    name: 'DOING'
  },
  {
    label: '已完成',
    name: 'DONE'
  },
  {
    label: '全部',
    name: ''
  },
];
export default {
  components: {
    'modify-dialog': dialog,
    'manage-table': ManageTable,
    'app-detail': detail,
    tabIndex: 0,
  },
  data () {
    return {
      detailVisible: false,
      modifyVisible: false,
      tabList: tabData,
      activeName: 'DONE', // 全部的默认为5
      userRight: JSON.parse(localStorage.getItem('userinfo')).code, // 用户权限
      loadFlag: false,
      tableData: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const param = {
        adminStatus: this.activeName.split(';'),
      };
      // if (this.userRight === 9) {
      //   param.adminStatus = this.activeName === '5' ? '' : this.activeName;
      // }
      this.loadFlag = true;
      http.post('/tax/ptc-web/apkinfo/find.do', param).then(res => {
        this.loadFlag = false;
        const list = res.data.list;
        list.forEach(item => {
          switch (item.status) {
            case 'READY':
              item.status = '待启动';
              break;
            case 'TO_CONFIRM':
              item.status = '待审核';
              break;
            case 'CONFIRM':
              item.status = '审核中';
              break;
            case 'DOING':
              item.status = '进行中';
              break;
            case 'DONE':
              item.status = '已完成';
              break;
            default:
              break;
          }
        });
        this.tableData = list;
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleClick(tab, event) {
      // this.tabIndex = tab.index;
      this.getData();
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

