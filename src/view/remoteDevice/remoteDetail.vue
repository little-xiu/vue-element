<template>
  <div class="remote-detail">
    <div class="title">
      调试记录详情
    </div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{commandTxt}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="全部日志">全部日志</el-dropdown-item>
        <el-dropdown-item command="Error">Error</el-dropdown-item>
        <el-dropdown-item command="Warn">Warn</el-dropdown-item>
        <el-dropdown-item command="Info">Info</el-dropdown-item>
        <el-dropdown-item command="Debug">Debug</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="format-wrap">
      <span class="format-emit" @click="onFormatClick">{{formatSelectedTxt}}</span>
      <ul class="format-list" v-show="formatVisible">
        <li
          class="format-item"
          v-for="(item, index) in formatList"
          @click="onFormatItemClick(item)"
          :key="index">{{item.label}}</li>
      </ul>
    </div>
    <div class="checkbox-wrap">
      <span class="all-check" :class="{'checked': allCheckFlag}" @click="allcheckClick">全选</span>
      <ul class="list">
        <li class="item"
          v-for="(item, index) in initCaps"
          :class="statusCls(item)"
          @click="singleItemClick(item)"
          :key="index">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commandTxt: '全部日志',
      formatList: [
        {
          label: '标清',
          value: 'standard',
        },
        {
          label: '高清',
          value: 'high',
        },
      ],
      formatSelectedTxt: '标清',
      formatSelectedVal: 'standard',
      formatVisible: false,
      initCaps: [],
      checkedCaps: [],
    }
  },
  created() {
    this.initCaps = ['item1', 'item2', 'item3', 'item4'];
  },
  mounted() {
    // 捕获过程要先于冒泡过程
    // 当第三个参数设置为true就在捕获过程中执行，false就在冒泡过程中执行处理函数。
    document.addEventListener('click', this.handleClickOnDocument, true);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOnDocument, true);
  },
  computed: {
    allCheckFlag() {
      return this.checkedCaps.length === this.initCaps.length;
    },
  },
  methods: {
    handleCommand(val) {
      console.log(val);
      this.commandTxt = val;
    },
    onFormatClick() {
      this.formatVisible = !this.formatVisible;
    },
    onFormatItemClick(item) {
      this.formatSelectedTxt = item.label;
      this.formatSelectedVal = item.value;
    },
    handleClickOnDocument() {
      this.formatVisible = false;
    },
    singleItemClick(item) {
      const pos = this.checkedCaps.indexOf(item);
      console.log(pos, 'pos');
      if(pos === -1){
        this.checkedCaps.push(item);
      } else {
        this.checkedCaps.splice(pos, 1);
      }
      this.initCaps = ['item1', 'item2', 'item3', 'item4'];
    },
    allcheckClick() {
      if (this.allCheckFlag) {
        this.checkedCaps = [];
      } else {
        this.checkedCaps = this.initCaps;
      }
    },
    statusCls(item) {
      if (this.checkedCaps.includes(item)) {
        return 'checked';
      }
      return '';
    }
  },
}
</script>
<style>
.format-list {
  position: absolute;
}
.checkbox-wrap .checked {
  color: red;
}
</style>
