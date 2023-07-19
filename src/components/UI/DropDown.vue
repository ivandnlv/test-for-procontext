<template>
  <div class="dropdown" @click="(e) => onDropdownClick(e)">
    <div class="dropdown__title">
      <input type="checkbox" />
      <span class="dropdown__title-text">{{ title }}</span>
    </div>
  </div>
  <div :class="dropdownContentClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const { title } = toRefs(props);

const dropdownInitialClass = 'dropdown__content';
const activeClass = '_active';

const dropdownContentClass = ref(dropdownInitialClass);
const onDropdownClick = (e: MouseEvent) => {
  // Проверка нажатия на div или span, для того чтобы механизм dropdown
  // не открывался при нажатии на checkbox
  if (e.target instanceof HTMLDivElement || e.target instanceof HTMLSpanElement) {
    if (dropdownContentClass.value.includes(activeClass)) {
      dropdownContentClass.value = dropdownInitialClass;
    } else {
      dropdownContentClass.value += ` ${activeClass}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
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
    gap: 10px;
    span {
      font-family: 'Roboto';
      cursor: pointer;
    }
  }
  &__content {
    overflow: hidden;
    max-height: 0;
    padding-left: 50px;
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
