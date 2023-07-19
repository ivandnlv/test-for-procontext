<template>
  <div class="output__item" v-if="lists[listIndex][listItemIndex].visibility">
    <div
      class="output__item-block"
      v-for="(_, index) in [...Array(lists[listIndex][listItemIndex].count)]"
      :key="index"
      :style="{ background: lists[listIndex][listItemIndex].color }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useListsStore, ListsState } from '@/store';
import { toRefs } from 'vue';

interface ListOutputItemProps {
  listIndex: number;
  listItemIndex: number;
}

const props = defineProps<ListOutputItemProps>();

const { listIndex, listItemIndex } = toRefs(props);

const listsStore: ListsState = useListsStore();

const { lists } = listsStore;
</script>

<style lang="scss" scoped>
.output__item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 10px;
  &-block {
    width: 10px;
    height: 10px;
  }
}
</style>
