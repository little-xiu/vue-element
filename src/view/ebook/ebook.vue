<template>
  <div class="ebook">
    <div class="left"></div>
    <div class="middle" @click="onNavShow"></div>
    <div class="right"></div>
    <transition name="slide-down">
      <div class="nav-wrapper" v-show="isNavShow">
        顶部导航
      </div>
    </transition>
    <transition name="slide-up">
      <div class="foot-wrapper" :class="{'hide-box-shadow': isSettingShow || !isNavShow}" v-show="isNavShow">
        <div class="icon-wraper">
          <span class="icon" @click="onShowTag(0)">字号设置</span>
        </div>
        <div class="icon-wraper">
          <span class="icon" @click="onShowTag(1)">显示进度条</span>
        </div>
        <div class="icon-wraper">
          <span class="icon" @click="onShowTag(2)">icon3</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrap" v-show="isSettingShow">
        <div class="setting-fontsize" v-if="showTag === 0">
          <div class="fontsize-wrap">
            <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
            <div class="select-container">
              <div class="select-wrap"
                v-for="(item, index) in fontSizeList"
                @click="onSelectFont(item.fontSize)"
                :key="index">
                <div class="line"></div>
                <div class="point-wrap">
                  <div class="point" v-show="defaultFontsize === item.fontSize">
                    <div class="sm-point"></div>
                  </div>
                </div>
                <div class="line"></div>
              </div>
            </div>
            <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 1">
          <div class="progress-wrap">
            <input
              type="range" class="progress" max="100" min="0" step="1"
              :value="progress"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              ref="progress"
            >
          </div>
          <div class="text-wrap">
            <span>{{progress + '%'}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isNavShow: false,
      isSettingShow: false,
      progress: 0,
      showTag: 0,
      fontSizeList: [
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
      ],
      defaultFontsize: 12,
    };
  },
  methods: {
    onNavShow() {
      this.isNavShow = !this.isNavShow;
      this.isSettingShow = false;
    },
    onShowTag(tag) {
      this.isSettingShow = true;
      this.showTag = tag;
    },
    onProgressChange(progress) {

    },
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    onSelectFont(font) {
      this.defaultFontsize = font;
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../less/global.scss';
.ebook {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 0 0 px2rem(100);
    height: 100%;
    // background: rgba(0,0,0, .3);
  }
  .middle {
    flex: 1;
    height: 100%;
    // background: yellow;
  }
  .right {
    flex: 0 0 px2rem(100);
    height: 100%;
    // background: rgba(0,0,0, .6);
  }
  .nav-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(40);
    z-index: 100;
    background: #fff;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
  }
  .foot-wrapper {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(40);
    z-index: 100;
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wraper {
      flex: 1;
      @include center;
      .icon {
        font-size: px2rem(20);
        cursor: pointer;
      }
    }
  }
  .setting-wrap {
    position: absolute;
    left: 0;
    bottom: px2rem(40);
    width: 100%;
    height: px2rem(60);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      height: 100%;
      width: 100%;
      .progress-wrap {
        height: 100%;
        width: 100%;
        @include center;
        padding: 0 px2rem(20);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background: #fff;
            border: px2rem(1) solid #ccc;
            cursor: pointer;
          }
        }
      }
    }
    .text-wrap {
      position: absolute;
      width: 100%;
      z-index: 101;
      @include center;
      bottom: 0;
    }
    .setting-fontsize {
      height: 100%;
    }
    .fontsize-wrap {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select-container {
        display: flex;
        height: 100%;
        flex: 1;
        .select-wrap {
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          flex: 1;
          display: flex;
          align-items: center;
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrap {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(8);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: -5px;
              left: -10px;
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              border: px2rem(1) solid #999;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0,0,0, .15);
              background: #fff;
              @include center;
              .sm-point {
                width: px2rem(5);
                height: px2rem(5);
                border-radius: 50%;
                background: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>
