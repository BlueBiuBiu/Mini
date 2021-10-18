<template>
  <div class="home">
    <comment-list ref="commentRef"></comment-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  components: {},
  methods: {},
  onReachBottom() {
	(this.$refs.commentRef as any).loadMore()
  },
});
</script>

<style lang="less" scoped></style>
