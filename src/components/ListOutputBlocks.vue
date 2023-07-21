<template>
  <div
    class="output__item-block"
    v-if="!mixed && settings[settingsIndex][settingsItemIndex].visibility"
  >
    <div
      class="block"
      v-for="(_, index) in [...Array(settings[settingsIndex][settingsItemIndex].count)]"
      :key="index"
      @click="onBlockClick"
      :style="{ background: settings[settingsIndex][settingsItemIndex].color }"
    ></div>
  </div>
  <div class="output__item-block" v-else-if="mixed && mixedArr">
    <div
      class="block"
      v-for="(color, index) in mixedArr"
      @click="() => onMixedBlockClick(color)"
      :key="index"
      :style="{ background: color }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { SettingsStore, useSettingsStore } from '@/store/settings';
import { onMounted, ref, toRefs, watch } from 'vue';

interface ListOutputItemProps {
  settingsIndex: number;
  settingsItemIndex: number;
  mixed?: boolean;
}

const props = defineProps<ListOutputItemProps>();

const { settingsIndex, settingsItemIndex, mixed = false } = toRefs(props);

const settingsStore: SettingsStore = useSettingsStore();

const { settings, deleteBlock, deleteBlockByColor } = settingsStore;

const onBlockClick = () => {
  deleteBlock(settingsIndex.value, settingsItemIndex.value);
};

const onMixedBlockClick = (color: string) => {
  deleteBlockByColor(settingsIndex.value, color);
};

const mixedArr = ref<string[] | null>(null);

const shuffleArr = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const createMixedArr = () => {
  if (mixed) {
    settings[settingsIndex.value].forEach((option) => {
      for (let i = 1; i <= option.count; i++) {
        if (option.visibility) {
          if (mixedArr.value?.length) {
            mixedArr.value.push(option.color);
          } else {
            mixedArr.value = [option.color];
          }
        }
      }
    });
    if (mixedArr.value) {
      mixedArr.value = shuffleArr(mixedArr.value);
    }
  }
};

onMounted(() => {
  createMixedArr();
});

watch(settings[settingsIndex.value], () => {
  mixedArr.value = null;
  createMixedArr();
});
</script>

<style lang="scss" scoped>
.output__item-block {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 10px;
  .block {
    width: 10px;
    height: 10px;
  }
}
</style>
