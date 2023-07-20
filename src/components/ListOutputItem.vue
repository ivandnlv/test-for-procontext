<template>
  <div class="output__item">
    <div>
      <div class="output__item-header">
        <span>{{ title }}</span>
        <MyBtn
          v-if="isVisible"
          :title="mix[index - 1] ? 'Сортировать' : 'Перемешать'"
          :on-btn-click="onMixClick"
        />
      </div>
      <div class="output__item-content" v-if="isVisible && !mix[index - 1]">
        <div style="margin-top: 20px">
          <ListOutputBlocks
            v-for="(_, i) in settings[index]"
            :key="i"
            :settings-index="index"
            :settings-item-index="i"
          />
        </div>
      </div>
      <div class="output__item-content" v-else-if="isVisible && mix[index - 1]">
        <div style="margin-top: 20px">
          <ListOutputBlocks
            :key="index"
            :settings-index="index"
            :settings-item-index="index"
            mixed
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { SettingsStore, useSettingsStore } from '@/store/settings';
import MyBtn from './UI/MyBtn.vue';
import ListOutputBlocks from './ListOutputBlocks.vue';

interface IListOutputItemProps {
  index: number;
  title: string;
}

const props = defineProps<IListOutputItemProps>();

const { index, title } = toRefs(props);

const settingsStore: SettingsStore = useSettingsStore();
const { changeMix, mix, settings } = settingsStore;

const toMix = ref(false);
const isVisible = ref(false);

watch(
  settings[index.value],
  () => {
    const visibleOptions = settings[index.value].filter((option) => option.visibility);
    if (visibleOptions.length) {
      isVisible.value = true;
    } else {
      isVisible.value = false;
    }
  },
  { deep: true },
);

const onMixClick = () => {
  toMix.value = !toMix.value;
  changeMix(index.value, toMix.value);
};
</script>

<style lang="scss" scoped>
.output__item {
  width: 100%;
  border: 1px solid #000;
  padding: 10px 20px;
  margin-bottom: 10px;
  &-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
}
</style>
