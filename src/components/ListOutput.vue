<template>
  <div class="output">
    <DropDown
      v-for="(list, index) in lists"
      :title="`List ${index + 1}`"
      :index="index"
      :key="index"
    >
      <ListOutputItem v-for="(_, i) in list" :key="i" :list-index="index" :list-item-index="i" />
    </DropDown>
  </div>
</template>

<script lang="ts" setup>
import DropDown from './UI/DropDown.vue';
import ListOutputItem from './ListOutputItem.vue';
import { useListsStore, ListsState } from '@/store';

const listsStore: ListsState = useListsStore();
const { lists } = listsStore;
</script>

<style lang="scss" scoped>
.output {
  width: 100%;
}
</style>
