<template>
  <main class="main">
    <ListSettings />
    <ListOutput />
  </main>
</template>

<script lang="ts" setup>
import ListSettings from './components/ListSettings.vue';
import ListOutput from './components/ListOutput.vue';
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Roboto', system-ui;
}
.main {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  height: 100vh;
}
</style>
