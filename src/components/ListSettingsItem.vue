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
        :max="numberMax"
        @input="onNumberInput"
        v-model.number="settings[settingsIndex][settingsItemIndex].count"
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
import { toRefs } from 'vue';

interface IListSettingsItemProps {
  title: string;
  settingsIndex: number;
  settingsItemIndex: number;
}

const numberMax = 1000;

const settingsStore: SettingsStore = useSettingsStore();
const { settings } = settingsStore;

const props = defineProps<IListSettingsItemProps>();

const { title, settingsIndex, settingsItemIndex } = toRefs(props);

const onNumberInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    if (+e.target.value >= numberMax) {
      e.target.value = numberMax.toString();
      settings[settingsIndex.value][settingsItemIndex.value].count = parseInt(e.target.value);
    } else {
      settings[settingsIndex.value][settingsItemIndex.value].count = parseInt(e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-settings__item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #000;
  width: 500px;
  align-items: center;
  margin-bottom: 10px;
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
