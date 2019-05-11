<template>
  <div class="device-page">
    <div class="search-box clearfix">
      <div class="search-left">
        <input class="search-input" type="text" v-model="searchMsg">
        <span class="search-icon">@</span>
      </div>
      <div class="search-right">
        <span class="time">
          累计使用时常：<span class="minutes">{{minutes}}</span>分钟
        </span>
        <span class="record-btn" @click="toCheckRecord">查看调试记录</span>
      </div>
    </div>
    <div class="checkbox-wrap">
      <div class="checkbox-item clearfix">
        <span class="checkbox-tit">品牌：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="brandCheckAll" @change="brandCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedBrands" @change="checkedBrandsChange">
            <el-checkbox
              v-for="(item, index) in brandList"
              :label="item"
              :key="index"
              v-show="index <= moreBrand.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreBrand')">
            {{moreBrand.txt}}
            <span v-show="moreBrand.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <div class="checkbox-item clearfix" v-show="expandFlag">
        <span class="checkbox-tit">ios系统：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="IOSCheckAll" @change="IOSCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedIOSs" @change="checkedIOSChange">
            <el-checkbox
              v-for="(item, index) in IOSList"
              :label="item"
              :key="index"
              v-show="index <= moreIOS.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreIOS')">
            {{moreIOS.txt}}
            <span v-show="moreIOS.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <div class="checkbox-item clearfix" v-show="expandFlag">
        <span class="checkbox-tit">Android系统：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="AndroCheckAll" @change="AndroCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedAndros" @change="checkedAndroChange">
            <el-checkbox
              v-for="(item, index) in AndroList"
              :label="item"
              :key="index"
              v-show="index <= moreAndro.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreAndro')">
            {{moreAndro.txt}}
            <span v-show="moreAndro.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <div class="checkbox-item clearfix" v-show="expandFlag">
        <span class="checkbox-tit">分辨率：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="ResoluCheckAll" @change="ResoluCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedResolus" @change="checkedResoluChange">
            <el-checkbox
              v-for="(item, index) in ResoluList"
              :label="item"
              :key="index"
              v-show="index <= moreResolu.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreResolu')">
            {{moreResolu.txt}}
            <span v-show="moreResolu.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <div class="checkbox-item clearfix" v-show="expandFlag">
        <span class="checkbox-tit">所有机型：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="ModelCheckAll" @change="ModelCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedModels" @change="checkedModelChange">
            <el-checkbox
              v-for="(item, index) in ModelList"
              :label="item"
              :key="index"
              v-show="index <= moreModel.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreModel')">
            {{moreModel.txt}}
            <span v-show="moreModel.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <div class="checkbox-item clearfix" v-show="expandFlag">
        <span class="checkbox-tit">状态：</span>
        <div class="checkbox-options">
          <el-checkbox
            v-model="StatusCheckAll" @change="StatusCheckAllChange">全部</el-checkbox> 
          <el-checkbox-group v-model="checkedStatuss" @change="checkedStatusChange">
            <el-checkbox
              v-for="(item, index) in StatusList"
              :label="item"
              :key="index"
              v-show="index <= moreStatus.num">{{item}}</el-checkbox>
          </el-checkbox-group>
          <span class="more-btn" @click="onMoreTab('moreStatus')">
            {{moreStatus.txt}}
            <span v-show="moreStatus.txt === '收起'" class="icon">^</span>
          </span>
        </div>
      </div>
      <span class="expand-btn" @click="handleExpand">
        {{expandFlag ? '收起' : '展开'}}
        <span class="expand-icon" v-show="expandFlag">^</span>
      </span>
    </div>
    <modle-list :modelDataSource="modelDataSource"/>
  </div>
</template>
<script>
  import modleList from '@/view/components/modelList';
  const brandLisOptions = ['上海', '北京', '广州', '深圳', '华为', 'sansung', 'vivo', 'xiaomi','apple','gugle', '魅族'];
  export default {
    components: {
      'modle-list': modleList,
    },
    data() {
      return {
        modelDataSource: [],
        searchMsg: '',
        minutes: 100,
        brandCheckAll: false,
        checkedBrands: [],
        brandList: [],
        moreBrand: {
          num: 7,
          txt: '更多',
        },
        IOSCheckAll: false,
        checkedIOSs: [],
        IOSList: [],
        moreIOS: {
          num: 7,
          txt: '更多',
        },
        AndroCheckAll: false,
        checkedAndros: [],
        AndroList: [],
        moreAndro: {
          num: 7,
          txt: '更多',
        },
        ResoluCheckAll: false,
        checkedResolus: [],
        ResoluList: [],
        moreResolu: {
          num: 7,
          txt: '更多',
        },
        ModelCheckAll: false,
        checkedModels: [],
        ModelList: [],
        moreModel: {
          num: 7,
          txt: '更多',
        },
        StatusCheckAll: false,
        checkedStatuss: [],
        StatusList: ['空闲', '我的占用',],
        moreStatus: {
          num: 7,
          txt: '更多',
        },
        expandFlag: false,
      };
    },
    created() {
      this.brandList = brandLisOptions;
      this.IOSList = brandLisOptions;
      this.AndroList = brandLisOptions;
      this.ResoluList = brandLisOptions;
      this.ModelList = ['高配', '中配', '低配'];
      this.modelDataSource = [
        {
          name: 'Galaxy note9',
          type: 'SM-N9800',
          system: 'Android os',
          size: '6.4',
          resolution: '2900*2400',
        },
        {
          name: 'Galaxy note9',
          type: 'SM-N9800',
          system: 'Android os',
          size: '6.4',
          resolution: '2900*2400',
        },
        {
          name: 'Galaxy note9',
          type: 'SM-N9800',
          system: 'Android os',
          size: '6.4',
          resolution: '2900*2400',
        },
        {
          name: 'Galaxy note9',
          type: 'SM-N9800',
          system: 'Android os',
          size: '6.4',
          resolution: '2900*2400',
        },
        {
          name: 'Galaxy note9',
          type: 'SM-N9800',
          system: 'Android os',
          size: '6.4',
          resolution: '2900*2400',
        },
      ];
    },
    methods: {
      brandCheckAllChange(val){
        this.checkedBrands = val ? this.brandList : [];
      },
      IOSCheckAllChange(val) {
        this.checkedIOSs = val ? this.IOSList : [];
      },
      AndroCheckAllChange(val) {
        this.checkedAndros = val ? this.AndroList : [];
      },
      ResoluCheckAllChange(val) {
        this.checkedResolus = val ? this.ResoluList : [];
      },
      ModelCheckAllChange(val) {
        this.checkedModels = val ? this.ModelList : [];
      },
      StatusCheckAllChange(val) {
        this.checkedStatuss = val ? this.StatusList : [];
      },
      checkedBrandsChange(value){
        console.log(value, '单个');
        let checkedCount = value.length;
        this.brandCheckAll = checkedCount === this.brandList.length;
      },
      checkedIOSChange(value) {
        this.IOSCheckAll = value.length === this.IOSList.length;
      },
      checkedAndroChange(value) {
        this.AndroCheckAll = value.length === this.AndroList.length;
      },
      checkedResoluChange(value) {
        this.ResoluCheckAll = value.length === this.ResoluList.length;
      },
      checkedModelChange(value) {
        this.ModelCheckAll = value.length === this.ModelList.length;
      },
      checkedStatusChange(value) {
        this.StatusCheckAll = value.length === this.StatusList.length;
      },
      onMoreTab(type){
        switch (type) {
          case 'moreBrand':
            this.moreBrand.num = this.moreBrand.txt === '更多' ? this.brandList.length : 7;
            this.moreBrand.txt = this.moreBrand.num === 7 ? '更多' : '收起';
            break;
          case 'moreIOS':
            this.moreIOS.num = this.moreIOS.txt === '更多' ? this.IOSList.length : 7;
            this.moreIOS.txt = this.moreIOS.num === 7 ? '更多' : '收起';
            break;
          case 'moreAndro':
            this.moreAndro.num = this.moreAndro.txt === '更多' ? this.AndroList.length : 7;
            this.moreAndro.txt = this.moreAndro.num === 7 ? '更多' : '收起';
            break;
          case 'moreResolu':
            this.moreResolu.num = this.moreResolu.txt === '更多' ? this.ResoluList.length : 7;
            this.moreResolu.txt = this.moreResolu.num === 7 ? '更多' : '收起';
            break;
          default:
            break;
        }
      },
      handleExpand() {
        if (this.expandFlag) {
          if (this.moreBrand.txt === '收起') {
            this.moreBrand.num = 7;
            this.moreBrand.txt = '更多'
          }
        }
        this.expandFlag = !this.expandFlag;
      },
      toCheckRecord() {
        this.$router.push('/remote/checkRecord');
      },
    }
  };
</script>
<style lang="less">
  .device-page {
    .search-box {
      padding-left: 20px;
      padding-right: 16px;
      padding-bottom: 12px;
    }
    .search-left {
      position: relative;
      float: left;
    }
    .search-input {
      height: 16px;
      line-height: 16px;
      border: 1px solid #ccc;
      padding: 4px 20px 4px 4px;
      outline: none;
    }
    .search-icon {
      position: absolute;
      width: 10px;
      height: 10px;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
    .search-right {
      float: right;
    }
    .time {
      .minutes {
        color: red;
      }
    }
    .record-btn {
      display: inline-block;
      background: blue;
      padding: 4px 8px;
      margin-left: 16px;
      color: #fff;
      cursor: pointer;
    }
    .checkbox-wrap {
      position: relative;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .checkbox-item {
      padding-left: 20px;
      line-height: 30px;
    }
    .checkbox-item:nth-of-type(odd) {
      background: #eee;
    }
    .checkbox-tit {
      float: left;
      width: 100px;
    }
    .checkbox-options {
      position: relative;
      float: left;
      width: 1000px;
    }
    .el-checkbox__label {
      font-size: 12px;
    }
    .more-btn {
      position: absolute;
      width: 40px;
      height: 30px;
      right: 0px;
      top: 0px;
      cursor: pointer;
      color: aquamarine;
    }
    .el-checkbox-group {
      float: left;
      width: 800px;
    }
    .checkbox-options > .el-checkbox {
      float: left;
      margin-right: 60px;
    }
    .el-checkbox-group .el-checkbox {
      margin-left: 0;
      width: 100px;
    }
    .el-checkbox__inner {
      border-color: #dcdfe6;
      background: #eee;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border: 1px solid #dcdfe6;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #fff;
      border-color: #dcdfe6;
    }
    .el-checkbox__inner:after {
      border-color: red;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #424656;
    }
    .el-checkbox {
      color: #424656;
    }
    .expand-btn {
      position: absolute;
      width: 50px;
      height: 30px;
      bottom: -60px;
      left: 50%;
      transform: translateY(-25px);
      text-align: center;
      cursor: pointer;
    }
  }
</style>
