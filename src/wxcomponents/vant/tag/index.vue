<template>
<uni-shadow-root class="vant-dist-tag-index"><view :class="'custom-class '+(utils.bem('tag', [type, size, { mark, plain, round }]))" :style="computed.rootStyle({ plain, color, textColor })">
  <slot></slot>
  <van-icon v-if="closeable" name="cross" custom-class="van-tag__close" @click="onClose"></van-icon>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant/dist/tag/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    type: {
      type: String,
      value: 'default',
    },
    closeable: Boolean,
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
});
export default global['__wxComponents']['vant/dist/tag/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tag{position:relative;display:inline-flex;align-items:center;padding:0 4px;padding:var(--tag-padding,0 4px);color:#fff;color:var(--tag-text-color,#fff);font-size:12px;font-size:var(--tag-font-size,12px);line-height:16px;line-height:var(--tag-line-height,16px);border-radius:2px;border-radius:var(--tag-border-radius,2px)}.van-tag--default{background-color:#969799;background-color:var(--tag-default-color,#969799)}.van-tag--default.van-tag--plain{color:#969799;color:var(--tag-default-color,#969799)}.van-tag--danger{background-color:#ee0a24;background-color:var(--tag-danger-color,#ee0a24)}.van-tag--danger.van-tag--plain{color:#ee0a24;color:var(--tag-danger-color,#ee0a24)}.van-tag--primary{background-color:#1989fa;background-color:var(--tag-primary-color,#1989fa)}.van-tag--primary.van-tag--plain{color:#1989fa;color:var(--tag-primary-color,#1989fa)}.van-tag--success{background-color:#07c160;background-color:var(--tag-success-color,#07c160)}.van-tag--success.van-tag--plain{color:#07c160;color:var(--tag-success-color,#07c160)}.van-tag--warning{background-color:#ff976a;background-color:var(--tag-warning-color,#ff976a)}.van-tag--warning.van-tag--plain{color:#ff976a;color:var(--tag-warning-color,#ff976a)}.van-tag--plain{background-color:#fff;background-color:var(--tag-plain-background-color,#fff)}.van-tag--plain:before{position:absolute;top:0;right:0;bottom:0;left:0;border:1px solid;border-radius:inherit;content:"";pointer-events:none}.van-tag--medium{padding:2px 6px;padding:var(--tag-medium-padding,2px 6px)}.van-tag--large{padding:4px 8px;padding:var(--tag-large-padding,4px 8px);font-size:14px;font-size:var(--tag-large-font-size,14px);border-radius:4px;border-radius:var(--tag-large-border-radius,4px)}.van-tag--mark{border-radius:0 999px 999px 0;border-radius:0 var(--tag-round-border-radius,999px) var(--tag-round-border-radius,999px) 0}.van-tag--mark:after{display:block;width:2px;content:""}.van-tag--round{border-radius:999px;border-radius:var(--tag-round-border-radius,999px)}.van-tag__close{min-width:1em;margin-left:2px}
</style>