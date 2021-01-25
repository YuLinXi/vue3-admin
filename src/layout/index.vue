<template>
  <el-container>
    <el-aside width="200px">
      <app-aside ref="aside" />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { Options, Vue, setup } from 'vue-class-component';
import { iUseStore } from '@/store';
import AppAside from './components/AppAside.vue';

const useInitData = () => {
  const store = iUseStore();
  onBeforeMount(() => {
    store.dispatch('getUserPermissions');
  });
  return {};
};

@Options({
  name: 'Layout',
  components: {
    AppAside,
  },
})
export default class Layout extends Vue {
  context = setup(useInitData)
}
</script>

<style scoped lang="scss">
.el-container {
  min-height: 100vh;
}

.el-aside {
  position: sticky;
  top: 0;
  max-height: 100vh;
  background: #d3dce6;
  width: 200px;
}

.el-header {
  background: #f8f9fb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.el-main {
  background: #e9eef3;
}
</style>
