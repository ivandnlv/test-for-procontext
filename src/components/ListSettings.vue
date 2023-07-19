<template>
  <div class="list-settings">
    <DropDown
      checkboxed
      v-for="(list, index) in lists"
      :key="index"
      :title="`List ${index + 1}`"
      :index="index"
    >
      <ListSettingsItem
        v-for="(item, i) in list"
        :key="i"
        :list-index="index"
        :list-item-index="i"
        :title="`Item ${i}`"
      />
    </DropDown>
  </div>
</template>

<script lang="ts" setup>
import DropDown from './UI/DropDown.vue';
import ListSettingsItem from './ListSettingsItem.vue';
import { useListsStore, ListsState } from '../store/index';

const listsStore: ListsState = useListsStore();
const { lists } = listsStore;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
