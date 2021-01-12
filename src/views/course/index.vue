<template>
  <div class="course-list">
    <el-card>
      <template v-slot:header>
        <span>数据筛选</span>
      </template>
      <el-form
        ref="form"
        label-width="70px"
        label-position="left"
        :model="context.filterParams"
      >

      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { } from 'vue';
import { Options, Vue, setup } from 'vue-class-component';

function useWrapped() {
  return {};
}

@Options({
  name: 'CourseList',
})
export default class Course extends Vue {
  context = setup(useWrapped)
}

</script>

<style scoped lang="scss">
.el-card {
  margin-bottom: 20px;
}
</style>
