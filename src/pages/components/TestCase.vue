<template>
  <div class="test-case">
    <p>测试概况</p>
    <p>实现异步加载多个接口，一个请求返回后再请求另一个接口</p>
    <p>
      数据1：{{data1}}
    </p>
    <p>
      数据2：{{data2}}
    </p>
  </div>
</template>
<script>
import * as api from '@/service/info.api';
export default {
  data() {
    return {
      data1: null,
      data2: null,
    }
  },
  created() {
    this.getTest1();
  },
  methods: {
    async getTest1() {
      const rs = await api.getTestCase1({id: '123'});
      this.data1 = rs && rs.data.userName;
      const rs2 = await api.getTestCase2({name: this.data1});// this.data1有值
      this.data2 = rs2.data.userName;
    },
  },
}
</script>
