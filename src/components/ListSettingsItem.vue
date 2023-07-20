<template>
  <div class="list-settings__item">
    <div class="list-settings__item-wrapper">
      <input
        type="checkbox"
        class="list-settings__item-checkbox"
        v-model="settings[settingsIndex][settingsItemIndex].visibility"
      />
      <span>{{ title }}</span>
    </div>
    <div class="list-settings__item-wrapper">
      <input
        type="number"
        class="list-settings__item-number"
        min="0"
        v-model="settings[settingsIndex][settingsItemIndex].count"
      />
      <input
        type="color"
        class="list-settings__item-color"
        v-model="settings[settingsIndex][settingsItemIndex].color"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SettingsStore, useSettingsStore } from '@/store/settings';
import { toRefs, watch } from 'vue';

interface IListSettingsItemProps {
  title: string;
  settingsIndex: number;
  settingsItemIndex: number;
}

const settingsStore: SettingsStore = useSettingsStore();
const { settings, disableMix } = settingsStore;

const props = defineProps<IListSettingsItemProps>();

const { title, settingsIndex, settingsItemIndex } = toRefs(props);
watch(
  settings[settingsIndex.value],
  () => {
    disableMix();
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
.list-settings__item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #000;
  width: 500px;
  align-items: center;
  &-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &-color {
    width: 20px;
    height: 20px;
    outline: none;
    border: none;
    padding: 0;
  }
  &-number {
    width: 50px;
    height: 20px;
  }
  label,
  input {
    display: block;
  }
}
</style>
