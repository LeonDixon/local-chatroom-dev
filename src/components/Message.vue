<template>
  <div class="message-container">
    <!--<div v-if="message == 'A user has connected'" id="message">
      A user has connected
    </div> -->
    <div v-if="!message.user" id="message">{{ message }}</div>
    <div v-else id="message">{{ message.user }}: {{ message.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store/store";
export default defineComponent({
  props: ["message", "chatroom"],
  setup(props) {
    const store = useStore();

    console.log("message");
    return {};
  },
});
</script>

<style lang="scss" scoped>
.message-container {
  word-wrap: break-word;
}
</style>
