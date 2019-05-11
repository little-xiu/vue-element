<template>
  <div class="report-center">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    <div>
      <iCode lang="js" slot="code">{{ code.base }}</iCode>
    </div>
    <div>
      <!-- <draggable v-model="myArray">
        <transition-group>
            <div v-for="element in myArray" :key="element.id">
                {{element.name}}
            </div>
        </transition-group>
    </draggable> -->
    <el-button @click="goEbook">go ebook page</el-button>
    </div>
  </div>
</template>
<script>
import iCode from './components/code';
import code from './js/code.js';
// import draggable from 'vuedraggable'
  export default {
    components: {
      // draggable,
      iCode,
    },
    data() {
      return {
        code,
        active: 0,
        myArray: [
          {
            id: '01',
            name: 'name1',
          },
          {
            id: '02',
            name: 'name1',
          },
          {
            id: '03',
            name: 'name1',
          },
          {
            id: '04',
            name: 'name1',
          },
        ],
      };
    },
    computed: {

    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      goEbook() {
        this.$router.push({path: '/ebook'});
      }
    }
  }
</script>
