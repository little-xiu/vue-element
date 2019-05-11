<template>
  <div class="header">
    <div class="head-content">
      <div class="head-logo" @click="goHome">
        <img src="@/assets/logo.png" alt="">
        <span>项目云测名称</span>
      </div>
      <div class="head-user">
        <el-dropdown trigger="click" @command="handleCommand">
          <div>
            <span>{{name}}</span>
            <!-- <img src="@/assets/logo.png" class="user-icon" alt=""> -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="q">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="router-style" v-if="!showBreadNav">
      <router-link to="/appManger">应用管理</router-link>
      <router-link to="/remote" v-show="code === 9">远程真机</router-link>
      <router-link to="/reportCenter">报告中心</router-link>
    </div>
    <div class="router-style" v-if="showBreadNav">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="display: inline-block; line-height: 20px; vertical-align: middle;">
        <el-breadcrumb-item :to="{ path: '/reportCenter' }">报告中心</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!isQuestionPage">
          {{taskApkName}} {{taskApkVersion}}测试报告
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="isQuestionPage" :to="{ path: '/testtabs/detail?id=' + taskApkId }">
          {{taskApkName}} {{taskApkVersion}}测试报告
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="isQuestionPage">问题详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import http from '@/service/http';

export default {
  name: 'TestHeader',
  data() {
    return {
      showBreadNav: false,
      isQuestionPage: false,
      name: '',
      code: 0,
    };
  },
  computed: {
    ...mapState({
      taskApkId: state => state.curTaskApkId,
      taskApkName: state => state.curTaskApkName,
      taskApkVersion: state => state.curTaskApkVersion,
    }),
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    back() {
      this.$router.back();//返回
    },
    handleCommand(v) {
      switch (v) {
        case 'q':// 用户退出登陆
          http.post('/tax/user/logout.do').then(() => {
            this.$message({
              message: '退出成功',
            });
            localStorage.removeItem('userinfo');
            this.$router.push('/login');
          });
          break;
        default:
          break;
      }
    },
    acoddingPathToShow(path) {
      if (path.indexOf('/testtabs') > -1 || path === '/problemDetail') {
        this.showBreadNav = true;
        if (path === '/problemDetail') {
          this.isQuestionPage = true;
        } else {
          this.isQuestionPage = false;
        }
      } else {
        this.isQuestionPage = false;
        this.showBreadNav = false;
      }
    }
   },
  created() {
    // 根据路由路径来控制是否显示某个DOM
    const path = this.$route.path || '';
    this.acoddingPathToShow(path);
    const userinfo = JSON.parse(localStorage.getItem('userinfo') || {});
    this.name = userinfo.name;
    this.code = userinfo.code;
  },// TestHeader.vue检测$route路由变化了，某些DOM的显示响应变化
  watch: {
    '$route': function watchRoute(val) {
      const path = val.path || '';
      this.acoddingPathToShow(path);
    },
  },
}
</script>
<style scoped>
.header {
  margin-bottom: 20px;
  background: #eee;
  padding-top: 20px;
}
.head-content {
  height: 50px;
  width: 1150px;
  margin: 0 auto;
}
  .head-logo {
    float: left;
  }
  .head-logo img {
    width: 30px;
  }
  .head-user {
    float: right;
  }
  .router-style {
    text-align: left;
    width: 1150px;
    margin: 0 auto;
  }
  .router-style a {
    text-decoration: none;
    display: inline-block;
    margin-right: 55px;
    font-weight: 600;
    font-size: 16px;
    color: #424656;
    line-height: 20px;
    height: 38px;
    cursor: pointer;
  }
  .router-style .router-link-active {
    color: #fd5720;
    border-bottom: 3px solid #fd5720;
  }
</style>
