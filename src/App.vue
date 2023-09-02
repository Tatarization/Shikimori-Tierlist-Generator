<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.error-notification {
  background: $light-red;
}
</style>
