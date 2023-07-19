<template>
  <DropDown v-for="(item, index) in arr" :key="index" :title="`List ${index + 1}`">
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem doloremque commodi
      eveniet possimus sit qui, itaque soluta sunt in sint necessitatibus eum earum inventore minima
      accusamus temporibus, voluptatibus tempora mollitia nobis neque recusandae, iusto id. Ab
      sequi, repudiandae fugit consectetur dolore repellat voluptatum quaerat voluptatibus eveniet,
      amet numquam tenetur eligendi!
    </p>
  </DropDown>
</template>

<script lang="ts" setup>
import DropDown from './components/UI/DropDown.vue';

const arr = [...new Array(5)];
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', system-ui;
}
</style>
