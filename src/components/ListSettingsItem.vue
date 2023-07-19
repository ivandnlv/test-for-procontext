<template>
  <div class="list-settings__item">
    <div class="list-settings__item-wrapper">
      <input
        type="checkbox"
        class="list-settings__item-checkbox"
        v-model="lists[listIndex][listItemIndex].visibility"
      />
      <span>{{ title }}</span>
    </div>
    <div class="list-settings__item-wrapper">
      <input type="number" class="list-settings__item-number" min="0" />
      <input type="color" class="list-settings__item-color" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListsState, useListsStore } from '@/store';
import { toRefs } from 'vue';

interface IListSettingsItemProps {
  title: string;
  listIndex: number;
  listItemIndex: number;
}

const listsStore: ListsState = useListsStore();
const { lists } = listsStore;

const props = defineProps<IListSettingsItemProps>();

const { title } = toRefs(props);
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
