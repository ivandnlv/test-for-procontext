<template>
  <div class="dropdown" @click="(e) => onDropdownClick(e)">
    <div class="dropdown__title">
      <svg
        :class="isActive ? '_active' : null"
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
      <input type="checkbox" v-model="checkBox" v-if="checkboxed" />
      <span class="dropdown__title-text">{{ title }}</span>
    </div>
  </div>
  <div :class="isActive ? 'dropdown__content _active' : 'dropdown__content'">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { useListsStore, ListsState } from '@/store';

interface IDropDownProps {
  title: string;
  index: number;
  checkboxed?: boolean;
}

const listsStore: ListsState = useListsStore();
const { changeAllVisibility } = listsStore;

const props = defineProps<IDropDownProps>();
const { title, index, checkboxed = false } = toRefs(props);

const checkBox = ref(false);
const isActive = ref(false);
const onDropdownClick = (e: MouseEvent) => {
  // Проверка нажатия на div или span, для того чтобы механизм dropdown
  // не открывался при нажатии на checkbox
  if (!(e.target instanceof HTMLInputElement)) {
    isActive.value = !isActive.value;
  }
};
watch(checkBox, () => {
  changeAllVisibility(index.value, checkBox.value);
});
</script>

<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  position: relative;
  border: 1px solid #000;
  padding: 10px;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 1px;
    height: 1px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
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
    overflow: hidden;
    max-height: 0;
    padding: 0 50px;
    transition: max-height 0.2s ease-in-out;
    transition: margin 0.2s ease-in-out;
    * {
      width: 100%;
    }
    &._active {
      max-height: 150px;
      margin: 20px 0;
    }
  }
}
</style>
