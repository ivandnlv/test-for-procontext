<template>
  <button @click="onBtnClick" class="btn">{{ title }}</button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

interface ButtonProps {
  title: string;
  onBtnClick: () => void;
}

const props = defineProps<ButtonProps>();
const { title, onBtnClick } = toRefs(props);
</script>

<style lang="scss" scoped>
$btn-background: rgb(70, 144, 255);
.btn {
  cursor: pointer;
  background: $btn-background;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: lighten($btn-background, 15%);
  }
  &:active {
    background: darken($btn-background, 15%);
  }
}
</style>
