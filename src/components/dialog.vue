<template>
  <div class="manage-modify-dialog">
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose">
      <div class="content">
        <div class="apk-wrap clearfix">
          <span class="apk-label">已上传APK安装包：</span>
          <div class="apk-inner">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
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
        radio: '1',
        dialogVisible: this.visible,
      };
    },
    methods: {
      handleClose () {

      }
    }
  }
</script>
<style>
.clearfix:after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  font-size: 0;
  visibility: hidden;
  overflow: hidden;
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
  color: #fff;
  cursor: pointer;
  outline: none;
}
</style>
