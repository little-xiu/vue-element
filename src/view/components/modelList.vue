<template>
  <div class="model-page">
    <div class="model-list clearfix">
      <div class="model-item" v-for="(item, index) in dataList" :key="index">
        <div class="model-top">
          <span class="name">{{item.name}}</span>
          <span class="idle-setted">已设置空闲提醒</span>
        </div>
        <div class="model-content clearfix">
          <div class="model-img">
            <img src="" alt="">
          </div>
          <div class="model-basic-info">
            <p class="info">型号：{{item.type}}</p>
            <p class="info">系统：{{item.system}}</p>
            <p class="info">尺寸：{{item.size}}</p>
            <p class="info">分辨率：{{item.resolution}}</p>
            <span class="use-btn">立即使用</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'model-list',
  props: {
    modelDataSource: {
      type: Array,
      defaultValue: [],
    },
  },
  data() {
    return {
      dataList: this.modelDataSource,
    };
  },
  watch: {
    modelDataSource(val) {
      this.dataList = val;
    },
  },
};
</script>
<style>
  .model-page {
    padding: 20px 10px 20px 20px;
  }
  .model-item {
    float: left;
    width: 260px;
    border: 1px solid #ccc;
    margin-right: 10px;
    margin-bottom: 10px;
    min-height: 180px;
  }
  .model-top {
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
  }
  .model-content {
    padding: 20px 10px;
    
  }
  .model-img {
    float: left;
    width: 80px;
    height: 100px;
  }
  .model-img img {
    display: block;
    width: 100%;
  }
  .model-basic-info {
    float: left;
  }
</style>
