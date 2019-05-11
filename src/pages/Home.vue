<template>
  <div class="home">
    <test-header />
    <router-view class="body" />
  </div>
</template>
<script>
import testHeader from './header/TestHeader';
export default {
  name: 'home',
  components: {testHeader},
  data() {
    return {};
  },
}
</script>
<style>
  .body {
    width: 1146px;
    margin: 0 auto;
    height: 100%;
  }
  .home {
    height: 100%;
  }
</style>


