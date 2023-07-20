<template>
  <div class="output">
    <div class="output__wrapper">
      <DropDown
        v-for="(option, index) in settings"
        :title="`List ${index + 1}`"
        :index="index"
        :key="index"
        with-mix-button
      >
        <div v-if="!mix[index - 1]">
          <ListOutputItem
            v-for="(_, i) in option"
            :key="i"
            :settings-index="index"
            :settings-item-index="i"
          />
        </div>
        <div v-else-if="mix[index - 1]">
          <ListOutputItem :key="index" :settings-index="index" :settings-item-index="index" mixed />
        </div>
      </DropDown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DropDown from './UI/DropDown/DropDown.vue';
import ListOutputItem from './ListOutputItem.vue';
import { SettingsStore, useSettingsStore } from '@/store/settings';

const settingsStore: SettingsStore = useSettingsStore();
const { settings, mix } = settingsStore;
</script>

<style lang="scss" scoped>
.output {
  padding: 60px;
  width: 100%;
}
</style>
