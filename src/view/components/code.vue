<template>
  <div>
    <pre :class="{bg: bg}">
      <code :class="language" ref="code">
        <slot></slot>
      </code>
    </pre>
    <span class="scale" @click="scale">
      <el-tooltip content="放大" placement="top">
        <i class="el-icon-news"></i>
      </el-tooltip>
    </span>
    <span class="copy" @click="clip">
      <el-tooltip content="复制代码" placement="top">
        <i class="el-icon-document" v-if="!copied"></i>
        <i class="el-icon-check" v-else></i>
      </el-tooltip>
    </span>
    <!-- <el-dialog :title="title" width="30%" :visible.sync="openScale">
      <pre :class="{bg: bg}"><code :class="language" ref="code2"></code></pre>
    </el-dialog> -->
    <el-dialog
      title="提示"
      :visible.sync="openScale"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <!-- <pre :class="{bg: bg}"><code :class="language" ref="code2"></code></pre> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="openScale = false">取 消</el-button>
        <el-button type="primary" @click="openScale = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import hljs from 'highlightjs/highlight.pack.js';
import Clipboard from 'clipboard';
import { setTimeout } from 'timers';
export default {
  props: {
    lang: {
      type: String,
      default: 'javascript',
    },
    bg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openScale: false,
      code: '',
      copied: false,
      docLang: this.$lang,
      title: 'Code',
    };
  },
  computed: {
    language() {
      if (this.lang === 'auto') {
        return '';
      } else {
        return this.lang;
      }
    }
  },
  mounted() {
    this.code = this.$refs.code.innerHTML.replace(/\n/, '');
    console.log(this.code);
    this.$refs.code.innerHTML = this.code;
    hljs.highlightBlock(this.$refs.code);
  },
  methods: {
    clip() {
      const code = this.code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      const clipboard = new Clipboard('.copy', {
        text() {
          return code;
        }
      });
      clipboard.on('success', (e) => {
        e.clearSelection();
        clipboard.destroy();
        this.copied = true; // 切换显示复制成功的对勾图标
        if (this.docLang === 'zh-CN') {
          this.$message.success('代码已复制到剪切版');
        } else {
          this.$message.success('code copied');
        }
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
    scale() {
      this.openScale = true;
      this.$nextTick(() => {
        // this.$refs.code2.innerHTML = this.code;
        // hljs.highlightBlock(this.$refs.code2);
      });
    },
    handleClose() {
      this.openScale = false;
    }
  },
}
</script>
<style scoped>
div {
  position: relative;
  font-size: 14px;
}
</style>
