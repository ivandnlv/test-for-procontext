<template>
  <div class="wrapper">
    <div class="dropdown" @click="(e) => onDropdownClick(e)">
      <div class="dropdown__header">
        <div class="dropdown__title">
          <svg
            :class="isActive || isSomeItemActive || allCheckBox ? '_active' : null"
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="7"
            viewBox="0 0 9 7"
            fill="none"
          >
            <path
              d="M0 1.73798L0.874823 0.916584L4.98178 5.2907L4.10696 6.11209L0 1.73798Z"
              fill="black"
            />
            <path
              d="M4.10696 6.11209L3.28557 5.23727L7.65968 1.13031L8.48107 2.00513L4.10696 6.11209Z"
              fill="black"
            />
          </svg>
          <input
            type="checkbox"
            v-model="allCheckBox"
            v-if="checkboxed"
            :indeterminate="isSomeItemActive"
          />
          <span class="dropdown__title-text">{{ title }}</span>
        </div>

        <MyBtn
          v-if="(isSomeItemActive || allCheckBox) && withMixButton"
          :title="toMix ? 'Сортировать' : 'Перемешать'"
          :on-btn-click="onMixClick"
        />
      </div>
    </div>
    <div
      :class="
        isActive || isSomeItemActive || allCheckBox
          ? 'dropdown__content _active'
          : 'dropdown__content'
      "
    >
      <div style="min-height: 0; position: relative">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { SettingsStore, useSettingsStore } from '@/store/settings';
import MyBtn from '../MyBtn.vue';

interface IDropDownProps {
  title: string;
  index: number;
  checkboxed?: boolean;
  withMixButton?: boolean;
}

const settingsStore: SettingsStore = useSettingsStore();
const { changeAllVisibility, changeMix, settings } = settingsStore;

const props = defineProps<IDropDownProps>();
const { title, index, checkboxed = false, withMixButton = false } = toRefs(props);

const allCheckBox = ref(false);
const isActive = ref(false);
const toMix = ref(false);
const isSomeItemActive = ref(false);
const onDropdownClick = (e: MouseEvent) => {
  // Проверка нажатия на div или span, для того чтобы механизм dropdown
  // не открывался при нажатии на checkbox или кнопку
  if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement)) {
    isActive.value = !isActive.value;
  }
};

watch(settings[index.value], () => {
  const optionsOnVisible = settings[index.value].filter((option) => option.visibility);
  if (optionsOnVisible.length > 0 && optionsOnVisible.length < settings[index.value].length) {
    isSomeItemActive.value = true;
  } else if (optionsOnVisible.length === settings[index.value].length) {
    isSomeItemActive.value = false;
    allCheckBox.value = true;
  } else {
    isSomeItemActive.value = false;
    allCheckBox.value = false;
  }
});

watch(allCheckBox, () => {
  changeAllVisibility(index.value, allCheckBox.value);
});

const onMixClick = () => {
  toMix.value = !toMix.value;
  changeMix(index.value, toMix.value);
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 10px;
}
.dropdown {
  cursor: pointer;
  border: 1px solid #000;
  margin-bottom: 10px;
  padding: 10px;
  &__header {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      font-family: 'Roboto';
      cursor: pointer;
    }
    svg {
      transition: transform 0.2s ease-in-out;
      &._active {
        transform: rotate(180deg);
      }
    }
  }
  &__content {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    padding: 0 50px;
    transition: grid-template-rows 0.2s ease-out;
    * {
      width: 100%;
    }
    &._active {
      grid-template-rows: 1fr;
      transition: grid-template-rows 0.2s ease-in;
    }
  }
}
</style>
