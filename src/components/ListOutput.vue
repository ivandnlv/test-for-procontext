<template>
  <div class="output">
    <div class="output__wrapper">
      <ListOutputItem
        v-for="(_, index) in settings"
        :index="index"
        :key="index"
        :title="`List ${index + 1}`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListOutputItem from './ListOutputItem.vue';
import { SettingsStore, useSettingsStore } from '@/store/settings';

const settingsStore: SettingsStore = useSettingsStore();
const { settings } = settingsStore;
</script>

<style lang="scss" scoped>
.output {
  flex: 1;
  padding: 60px;
  width: 100%;
}
</style>
