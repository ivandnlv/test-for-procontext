<template>
  <div class="settings">
    <DropDown
      checkboxed
      v-for="(option, index) in settings"
      :key="index"
      :title="`List ${index + 1}`"
      :index="index"
    >
      <ListSettingsItem
        v-for="(_, i) in option"
        :key="i"
        :settings-index="index"
        :settings-item-index="i"
        :title="`Item ${i + 1}`"
      />
    </DropDown>
  </div>
</template>

<script lang="ts" setup>
import DropDown from './UI/DropDown/DropDown.vue';
import ListSettingsItem from './ListSettingsItem.vue';
import { SettingsStore, useSettingsStore } from '../store/settings';

const listsStore: SettingsStore = useSettingsStore();
const { settings } = listsStore;
</script>

<style lang="scss" scoped>
.settings {
  padding: 60px;
}
</style>
