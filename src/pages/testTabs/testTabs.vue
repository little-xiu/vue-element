<template>
  <div class="wrap">
    <div class="tabs" v-if="tabVisible">
      <router-link
        class="tab"
        :to="'/testtabs/profile?id=' + queryId"
        tag="span"
        active-class="active"
      >测试概况</router-link>
      <router-link
        class="tab"
        :to="'/testtabs/detail?id=' + queryId"
        tag="span"
        active-class="active"
      >测试详情</router-link>
    </div>
    <div class="tabCont">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestTabs',
  data() {
    return {
      queryId: '',
      tabVisible: true,
    };
  },
  created() {
    this.queryId = this.$route.query.id;
    // this.queryId = 'jsdifa83';
    const path = this.$route.path || '';
    if (path.indexOf('/testtabs/check') > -1) {
      this.tabVisible = false;
    } else {
      this.tabVisible = true;
    }
  }
}
</script>
<style lang="less" scoped>
  @import './testTabs.less';
</style>

