<template>
  <div class="aside">
    <div class="aside-logo">
      LOGO
    </div>
    <el-menu
      default-active="2"
      class="aside-menu"
      @open="context.handleOpen"
      @close="context.handleClose"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Options, Vue, setup } from 'vue-class-component';
import { iUseStore } from '@/store';

function useAppAside() {
  const store = iUseStore();
  const permissions = computed(() => store.state.permissions);
  const handleOpen = () => {
    console.log(permissions);
  };
  const handleClose = () => {
    console.log(122);
  };
  return {
    handleClose,
    handleOpen,
    permissions,
  };
}

@Options({
  name: 'AppAside',
})
export default class AppAside extends Vue {
  context = setup(useAppAside)
}

</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  .aside-menu {
    flex: 1;
  }
  &-logo {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
