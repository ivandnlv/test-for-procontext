<template>
  <div class="output__item" v-if="settings[settingsIndex][settingsItemIndex].visibility && !mixed">
    <div
      class="output__item-block"
      v-for="(_, index) in [...Array(settings[settingsIndex][settingsItemIndex].count)]"
      :key="index"
      :style="{ background: settings[settingsIndex][settingsItemIndex].color }"
    ></div>
  </div>
  <div class="output__item" v-else-if="mixed && mixedArr">
    <div
      class="output__item-block"
      v-for="(color, index) in mixedArr"
      :key="index"
      :style="{ background: color }"
    ></div>
  </div>
  <div v-else>Пока пусто..</div>
</template>

<script lang="ts" setup>
import { SettingsStore, useSettingsStore } from '@/store/settings';
import { onMounted, ref, toRefs } from 'vue';

interface ListOutputItemProps {
  settingsIndex: number;
  settingsItemIndex: number;
  mixed?: boolean;
}

const props = defineProps<ListOutputItemProps>();

const { settingsIndex, settingsItemIndex, mixed = false } = toRefs(props);

const settingsStore: SettingsStore = useSettingsStore();

const { settings } = settingsStore;

const mixedArr = ref<string[] | null>(null);

const shuffleArr = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

onMounted(() => {
  if (mixed) {
    settings[settingsIndex.value].forEach((option) => {
      for (let i = 0; i <= option.count; i++) {
        if (mixedArr.value?.length) {
          mixedArr.value.push(option.color);
        } else {
          mixedArr.value = [option.color];
        }
      }
    });
    if (mixedArr.value) {
      mixedArr.value = shuffleArr(mixedArr.value);
    }
  }
});
</script>

<style lang="scss">
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
