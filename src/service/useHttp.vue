<template>
  <div class="use-http">
    <ul>
      <li
        v-for="(item, index) in steps"
        :key="index"
        class="step-item"
        :class="statusCls(item, index)"
        @click="onStepClick(item, index)">
        {{`step${item && item.step}`}}
      </li>
    </ul>
   
  </div>
</template>
<script>
import http from '@/service/http';
import { resolve } from 'url';
export default {
  data() {
    return {
      steps: [],
      doneSteps: [], //存储已完成的步骤
      undoneSteps: [],
      pageUndones: [], // 存储当前步骤中所有未完成的页码
      curStep: '',
      curStepIndex: 0,
      applyId: '',
    };
  },
  created() {
    // 异步：保证一定是第一个请求之后再执行第二个请求
    this.onStepHttp().then((data) => {
      this.steps = data;
      this.curStep = this.steps[this.curStepIndex] && this.steps[this.curStepIndex].step;
      this.onPagesHttp();
    });
  },
  methods: {
    async onStepHttp() {
      return await new Promise((resolve) => {
        http.post('/route/find.do', {
          id: this.applyId,
        }).then((res) => {
          if (res.data) {
            resolve(res.data);
          }
        }).catch((e) => {
          console.log(e);
        });
      });
    },
    onPagesHttp() {
      http.post('url', {}).then((res) => {

      }).catch(e => {});
    },
    // step的样式，当前.actice;已完成步骤：.submit;未完成：默认''
    statusCls(item, index) {
      if (this.curStepIndex === index) {
        return 'active';
      } else if (this.doneSteps.indexOf(item.step) !== -1) {
        return 'submit';
      } else if (this.undoneSteps.indexOf(item.step) !== -1) {
        return '';
      }
    },
    onStepClick(item, index) {
      // 点击切换前，判断点击的前一步骤的状态是否已完成
      // 点击的前一步骤项
      const prevItem = this.steps[this.curStepIndex] && this.steps[this.curStepIndex].step;
      // 前一步骤的所有页码全部完成时,已完成步骤中如果没包含该项就添加，未完成步骤中如果包含该项就删除；
      if (this.pageUndones.length === 0) {
        if (this.doneSteps.indexOf(prevItem) === -1) {
          this.doneSteps.push(prevItem);
        }
        const delIndex = this.undoneSteps.indexOf(prevItem);
        if (delIndex > -1) {
          this.undoneSteps.splice(delIndex, 1);
        }
      }
      this.curStep = item.step;
      this.curStepIndex = index;
      this.onPagesHttp();
    },
  },
}
</script>
