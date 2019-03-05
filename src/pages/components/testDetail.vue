<template>
  <div class="test-detail">
    <div class="items">
      <span class="txt">测试结果</span>
      <div style="display: inline-block; width: 1026px">
        <span
          :class="{item: true, active: item.active, disabled: item.disabled}"
          v-for="(item, index) in statusList"
          :key="index"
          @click="itemClick(item, index, 'status')">
          {{item.itemName}}
        </span>
      </div>
    </div>
    <div class="items" v-show="!hideProblem">
      <span class="txt">测试问题</span>
      <div>
        <span
          :class="{item: true, active: item.active, disabled: item.disabled}"
          v-for="(item, index) in problemList"
          :key="index"
          @click="itemClick(item, index, 'problem')">
          {{item.itemName}}
        </span>
      </div>
    </div>
    <div class="items">
      <span class="txt">手机品牌</span>
      <div>
        <span
          :class="{item: true, active: item.active, disabled: item.disabled}"
          v-for="(item, index) in phoneList"
          :key="index"
          @click="itemClick(item, index, 'phone')">
          {{item.itemName}}
        </span>
      </div>
    </div>
    <div class="table">
      <el-table style="margin: 10px auto; border: 1px solid #eee; width: 100%;" :data="dataList">
        <el-table-column label="手机品牌" prop="devBrand"></el-table-column>
        <el-table-column label="测试环境">
          <template slot-scope="scope">
            <template v-if="scope.row.analyzedResultFlag === 'PASS'">
              <span>通过</span>
            </template>
            <template v-if="scope.row.analyzedResultFlag === 'FAIL'">
              <span>不通过</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button type="text" @click="checkClick($event, scope)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { brandTypes, errorType } from '@/utils/constant';
import { setTimeout } from 'timers';
export default {
  name: 'test-detail',
  data() {
    const errors = errorType.map((item) => ({
      itemKey: item.key,
      itemName: item.txt,
      disabled: false,
      active: false,
    }));
    const brands = Object.keys(brandTypes).map((key) => ({
      itemKey: key,
      itemName: brandTypes[key],
      disabled: false,
      active: false,
    }));
    return {
      params: {
        resultTaskObject: '',
        pageSize: 10,
        pageNo: 1,
        analyzedResultFlag: '',
        resultDevBrand: '',
      },
      total: 0,
      hideProblem: false,
      statusList: [
        {
          itemKey: '',
          itemName: '全部',
          disabled: false,
          active: true,
        },
        {
          itemKey: 'PASS',
          itemName: '通过',
          disabled: false,
          active: false,
        },
        {
          itemKey: 'FAIL',
          itemName: '不通过',
          disabled: false,
          active: false,
        },
      ],
      problemList: [
        {
          itemKey: '',
          itemName: '全部',
          disabled: false,
          active: true,
        },
      ].concat(errors),
      phoneList: [
        {
          itemKey: '',
          itemName: '全部',
          disabled: false,
          active: true,
        },
      ].concat(brands),
      dataList: [],
      noBrandList: [],
    };
  },
  created() {
    const id = this.$route.query.id;
    this.params.resultTaskObject = id;
    // http.post('', this.params
    // ).then(res => {
    //   this.dataList = res.data.list || [];
    //   this.total = res.data.count || 0;
    //   this.noBrandList = res.data.noExistDevBrandList || [];
    // });
    setTimeout(() => {
      this.dataList = [
        {
          analyzedResultFlag: 'FAIL',
          devBrand: 'samsung',         
        },
        {
          analyzedResultFlag: 'PASS',
          devBrand: 'xiaomi',         
        },
        {
          analyzedResultFlag: 'FAIL',
          devBrand: 'HUAWEI',         
        },
      ];
      this.noBrandList = ['OPPO', 'HUAWEI'];
    }, 1000);
  },
  methods: {
    handleCurrentChange(cur) {
      this.params.pageNo = cur;
      this.dataList = [
        {
          analyzedResultFlag: 'FAIL',
          devBrand: 'Jinli',         
        },
        {
          analyzedResultFlag: 'PASS',
          devBrand: 'apple',         
        },
        {
          analyzedResultFlag: 'FAIL',
          devBrand: 'HUAWEI',         
        },
      ];
      this.noBrandList = ['OPPO', 'HUAWEI'];
    },
    itemClick(item, index, type) {
      if (!item.disabled) {
        switch (type) {
          case 'status':
            this.statusList.forEach((item) => item.active = false);
            item.active = true;
            if (item.itemKey === 'PASS') {
              this.hideProblem = true;
              // 重置手机选项
              this.phoneList.forEach(item => item.active = false);
              this.problemList[0].active = true;
            } else {
              this.hideProblem = false;
            }
            this.params.analyzedResultFlag = item.itemKey;
            break;
          case 'problem':
            this.problemList.forEach(item => item.active = false);
            item.active = true;
            this.params.analyzedResultFlag = item.itemKey;
            break;
          case 'phone':
            this.phoneList.forEach(item => item.active = false);
            item.active = true;
            this.params.analyzedResultFlag = item.itemKey;
            break;
          default:
            break;
        }
        this.params.pageNo = 1;
        // 请求数据省略了
      }
    },
    checkClick($event, scope) {
      // let id = scope.row.id;
      this.$router.push({path: '/problemDetail', query: {id: 'sds111'}});
    },
  },
  watch: {
    noBrandList(val) {
      this.phoneList.forEach(item => item.disabled = false);
      val.forEach((key) => {
        this.phoneList.forEach(item => {
          if (item.itemKey === key) {
            item.disabled = true;
          }
        });
      });
    },
  },
}
</script>
<style lang="less" scoped>
.test-detail {
  margin-top: 20px;
}
.items {
  margin-bottom: 20px;
  .txt {
    float: left;
    margin-top: 7px;
  }
  > div {
    display: inline-block;
    width: 1026px;
    text-align: left;
  }
  .item {
    padding: 4px 16px;
    border: 1px solid #e2e3e6;
    border-radius: 2px;
    display: inline-block;
    margin-right: 20px;
  }
  .active {
    color: #fd6720;
    border-color: #fd6720;
  }
  .disabled {
    background: #fafafa;
    color: #B8B8C3;
    cursor: not-allowed;
  }
}
</style>
