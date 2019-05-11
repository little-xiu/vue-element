<template>
  <div class="login-page">
    <div class="form-wrap">
      <div class="form-row">
        <i class="el-icon-share"></i>
        <div class="form-input">
          <input type="text"
            v-model.trim="username"
            class="input-inner"
            @blur="inputBlur('username',username)"
            @keyup="inputBlur('username',username)"
            placeholder="请输入账号"
          >
        </div>
        <span class="form-error">{{userErr}}</span>
      </div>
      <div class="form-row">
        <i class="el-icon-share"></i>
        <div class="form-input">
          <input type="password"
            v-model.trim="password"
            class="input-inner"
            @blur="inputBlur('password',password)"
            @keyup="inputBlur('password',password)"
            placeholder="请输入密码"
          >
        </div>
        <span class="form-error">{{psdErr}}</span>
        <div>

        </div>
      </div>
      <el-button size="medium" :loading="loading" @click="onLogin">登陆</el-button>
    </div>
    <router-link to="/register">注册账号</router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { setTimeout } from 'timers';
import http from '@/service/http';
import * as api from '../service/info.api';
export default {
  name: 'login',
  data() {
    return {
      username: '',
      userErr: '',
      password: '',
      psdErr: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters('login', [
      'getUser',
    ]),
  },
  created() {
    const obj = this.getUser;
    if (obj.username) {
      this.username = obj.username;
      this.password = obj.password;
    }
  },
  methods: {
    async onLogin() {
      if (this.validForm()) {
        this.loading = true;
        const res = await api.getLogin({
          name: this.username,
          password: this.password,
        });
        const code = res.data.code;
        this.loading = false;
        this.$message.closeAll();
        this.$message({
          message: '登陆成功',
          type: 'success',
        });
        localStorage.setItem('userinfo', JSON.stringify({ name: this.username, code, }));
        this.$router.push('/');
        // http.post('/tax/user/signin.do', {
        //   name: this.username,
        //   password: this.password,
        // }).then(res => {
        //   const code = res.data.code;
        //   this.loading = false;
        //   this.$message.closeAll();
        //   this.$message({
        //     message: '登陆成功',
        //     type: 'success',
        //   });
        //   localStorage.setItem('userinfo', JSON.stringify({ name: this.username, code, }));
        //   this.$router.push('/');
        // }).catch(e => {
        //   console.log(e);
        // });
      }
    },
    validForm() {
      if (this.username === '') {
        this.userErr = '请输入账号';
        return false;
      }
      if (this.password === '') {
        this.psdErr = '请输入密码';
        return false;
      }
      return true;
    },
    inputBlur(errType, inputContent) {
      if (errType === 'username') {
        if (inputContent === '') {
          this.userErr = '请输入账号';
        } else {
          this.userErr = '';
        }
      }
      if (errType === 'password') {
        if (inputContent === '') {
          this.psdErr = '请输入密码';
        } else {
          this.psdErr = '';
        }
      }
    },
  },
}
</script>
