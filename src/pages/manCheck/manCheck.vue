<template>
  <div class="man-check">
    <ul v-for="(item, index) in list" :key="index">
      <li>
        <div>
          <p>{{item.name}}</p>
          <p v-if="notCorrect && notCorrect[index] && notCorrect[index].startDate">
            {{notCorrect[index].startDate}}
            {{marryNoCorrect && marryNoCorrect.mateDate}}
          </p>
        </div>
      </li>
    </ul>
    <el-button @click="onSave">保存</el-button>
    <!-- <el-progress :percentage="2d0" color="#8e71c7"></el-progress> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      notCorrect: [],
      list: [],
      marryNoCorrect: {},
    };
  },
  created() {
    // 设置面包屑导航名称,因为store里的state数据页面一刷新就没有了，所以从本地存储中拿
    let navObj = localStorage.getItem('saveTask') || '{}';
    navObj = JSON.parse(navObj);
    this.$store.dispatch('setTask', navObj);
    this.list = [
      {
        name: 'bob',
      }
    ]
  },
  methods: {
    // 当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，
    // 向对象中添加新的属性，如果更新此属性的值，是不会更新视图的。解决：this.$set( target, key, value );
    // 或者this.obj= Object.assign({}, this.obj, { a: 1, e: 2 })；或者{...this.obj};
    onSave() {
      for (let i = 0; i < this.list.length; i++) {
        this.$set(this.notCorrect, i, {}); //重要一步
        if (true) {
          this.$set(this.notCorrect[i], 'startDate', '开始日期不得晚于');
          this.$set(this.marryNoCorrect, 'mateDate', '日期不一致');
        } else {
          this.$set(this.notCorrect[i], 'startDate', null);
          this.$set(this.marryNoCorrect, 'mateDate', null);
        }
      }
    }
  }
}
</script>
