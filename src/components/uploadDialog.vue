<template>
  <div class="manage-modify-dialog">
    <el-dialog
      title="兼容性测试"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose">
      <div class="content">
        <div class="type-wrap clearfix">
          <span class="type-item" :class="{'on': (isActive === 'android')}" @click="handleTab('android')">Android</span>
          <span class="type-item" :class="{'on': (isActive === 'ios')}" @click="handleTab('ios')">IOS</span>
        </div>
        <div class="last-upload-wrap">
          <h3 class="sub-title">最近上传的APK</h3>
          <ul class="last-apk-wrap clearfix">
            <li class="last-apk-item fl">
              <img src="../assets/logo.png" />
              <i class="el-icon-error"></i>
            </li>
          </ul>
        </div>
        <div class="apk-wrap clearfix">
          <span class="apk-label">已上传APK安装包：</span>
          <div class="apk-inner">
            <el-upload
              :before-upload="onBeforeUpload"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="onUpload"
              multiple>
              <span class="icon-upload">icon</span>
              <span class="el-upload__text">点击或拖拽上传APK</span>
              <div class="el-upload__tip" slot="tip">注：只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div class="file-wrap clearfix">
          <span class="apk-label">已上传要求说明：</span>
          <div class="apk-inner">
            <el-upload
              class="upload-demo"
              :before-upload="onBeforeUpload2"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <span class="el-icon-plus"></span>
              <span class="el-upload__text">点击此处&nbsp;&nbsp;导入您的</span>
              <div class="el-upload__tip" slot="tip">注：只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span class="submit-btn">确定提交测试</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import http from '@/service/http';
  export default {
    name: 'modify-dialog',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        dialogVisible: this.visible,
        isActive: 'android',
        apkName: '',
      };
    },
    watch: {
      visible (val) {
        this.dialogVisible = val;
      },
    },
    methods: {
      handleClose () {
        this.$emit('closeDialog');
      },
      handleTab (val) {
        this.isActive = val;
      },
      onBeforeUpload (file) {
        // 最后一个点的下标
        const index = file.name.lastIndexOf('.') + 1;
        if (file.name.substring(index) !== 'apk') {
          this.$message.error({
            message: '上传文件仅支持apk文件'
          });
          return false;
        }
        return true;
      },
      onBeforeUpload2 (file) {
        const index = file.name.lastIndexOf('.') + 1;
        const name = file.name.substring(index);
        if (this.apkName === '') {
          this.$message.error({message: '请先上传apk'});
          return false;
        }
        const isExcelOrWord = name === 'xls' || name === 'xlsx' || name === 'doc' || name === 'docx';
        if (!isExcelOrWord) {
          this.$message.error({message: '上传文件仅支持word/excel格式'});
          return false;
        }
        return true;
      },
      onUpload (file) {
        console.log(file, 'onUpload');
        const status = file.status;
        if (status === 'success') {
          const response = file.response;
          if (response.code === '10001') {
            this.onLoadFile(response.data);
          } else {
            this.$message({
              message: '上传失败'
            });
          }
        } else if (status === 'error') {
          this.$message({
            message: '上传失败'
          });
        }
      }
    },//解析apk
    onLoadFile (data) {
      // http.post('/route27/info.do', {
      //   apkSize: data.apkSize,
      // }).then(res => {

      // }).catch(err => {

      // })
    }
  }
</script>
<style lang="less">
// 更改element的样式生效，不用scope锁住，用父级元素限制；
.manage-modify-dialog {
  .type-wrap {
    .on {
      background: #fc652f;
      color: #fff;
      border-color: #fc652f;
    }
    .type-item {
      float: left;
      width: 88px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #e0e0e0;
      text-align: center;
      cursor: pointer;
    }
  }
  .last-apk-wrap {
    margin-bottom: 20px;
  }
  .sub-title {
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 10px;
    &:before {
      content: '';
      display: inline-block;
      width: 3px;
      height: 8px;
      background: #fc652f;
      margin-right: 7px;
    }
  }
  .last-apk-item {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.06); 
    img {
      width: 100%;
    }
    .el-icon-error {
      position: absolute;
      right: -6px;
      top: -4px;
    }
  }
}
.manage-modify-dialog {
  text-align: left;
}
.manage-modify-dialog .el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 20px 26px 20px 20px;
}
.manage-modify-dialog .content {
  padding: 4px 103px 17px 35px;
}
.manage-modify-dialog .apk-label {
  float: left;
  margin-right: 4px;
  margin-top: 8px;
  width: 125px;
}
.manage-modify-dialog .apk-inner {
  float: left;
}
.manage-modify-dialog .icon-upload {
  display: inline-block;
  padding: 16px 14px;
  border: 1px dashed #d6d6d6;
  border-radius: 9px;
  margin-left: 45px;
  margin-top: 23px;
  margin-right: 14px;
}
.manage-modify-dialog .el-upload__text {
  display: inline-block;
  color: #c1c1c1;
}
.manage-modify-dialog .apk-wrap .el-upload-dragger {
  width: 487px;
  height: 94px;
  background: #f5f5f5;
  border-radius: 2px;
  border: none;
  text-align: left;
  color: #c1c1c1;
}
.manage-modify-dialog .file-wrap {
  margin-top: 32px;
}
.manage-modify-dialog .file-wrap .el-icon-plus {
  display: inline-block;
  padding: 17px 17px;
  border: 1px dashed #d6d6d6;
  border-radius: 9px;
  margin-left: 46px;
  margin-top: 32px;
  margin-right: 14px;
}
.manage-modify-dialog .file-wrap .el-upload-dragger {
  width: 487px;
  height: 114px;
  background: #f5f5f5;
  border-radius: 2px;
  border: none;
  text-align: left;
  color: #c1c1c1;
}
.manage-modify-dialog .el-upload__tip:before {
  content: "*";
  color: #fc652f;
  margin-right: 5px;
  position: relative;
  top: 1px;
}
.manage-modify-dialog .submit-btn {
  display: inline-block;
  padding: 7px 17px;
  background: #424656;
  border-radius: 2px;
  margin-top: 48px;
  margin-left: 184px;
  color: #fff;
  cursor: pointer;
  outline: none;
}
</style>
