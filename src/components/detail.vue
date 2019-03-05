<template>
  <div class="app-detail">
    <el-dialog
      :visible.sync="detailVisible"
      width="40%"
      :show-close= "showClose"
      :before-close="handleClose">
      <div class="title-box" slot="title">
        <span class="title">设置配置参数</span>
        <!-- <span class="add-btn" @click="onAdd">+新增</span> -->
        <el-button plain icon="el-icon-plus" @click="onAdd">新增</el-button>
      </div>
      <ul class="content-wrap">
        <li class="content-item" v-for="(item, index) in dataList" :key="index">
          <p class="item-name">{{`参数${index+1}`}}</p>
          <el-form :model="item">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="item.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-input v-model="item.region" autocomplete="off"></el-input>
            <el-button
              v-if="index !== 0"
              @click.native.prevent="onDelete(index)"
              type="text"
              size="small">
              删除
            </el-button>
            </el-form-item>
          </el-form>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'app-detail',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      dataList: [
        {
          name: '',
          region: '',
        },
      ],
      showClose: false,
      detailVisible: this.visible,
      formLabelWidth: '80px',
      name: '', // 存储ManageTable组件传值，确定点击的是哪一个
    }
  },
  watch: {
    visible (val) {
      this.detailVisible = val;
    }
  },
  mounted () {
    // 非父子组件传值，接受值先监听；
    this.$center.$on('onConfig', (data) => {
      this.$emit('onOpen');
      console.log(data);
      this.name = data;
    })
  },
  methods: {
    handleClose () {
      this.$emit('onClose');
    },
    onDelete (index) {
      this.dataList.splice(index, 1);
    },
    onAdd () {
      this.dataList.push({
        name: '',
        region: '',
      });
    },
    onSave() {
      console.log(this.dataList);
      this.$emit('onClose');
    }
  }
}
</script>
<style lang="less">
  .app-detail {
    .title-box {
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      .title {
        float: left;
      }
      .add-btn {
        float: right;
        color: blue;
        cursor: pointer;
      }
      .el-button {
        float: right;
      }
    }
    .dialog-footer {
      text-align: center;
    }
    .content-item {
      margin-bottom: 10px;
      .item-name {
        font-size: 18px;
        text-align: left;
        margin-bottom: 4px;
      }
    }
    .el-form-item__content {
      position: relative;
      padding-right: 100px;
      .el-button {
        position: absolute;
        width: 50px;
        height: 20px;
        top: 5px;
        right: 0;
      }
    }
  }
</style>
