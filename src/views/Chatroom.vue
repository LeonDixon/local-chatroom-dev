<template>
  <div class="container">
    <div>
      <h1>Chatroom</h1>
    </div>
    <div class="chatroom-container">
      <div id="chatroom">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div class="input-group message-input bg-dark">
        <input
          v-model="message"
          class="form-control"
          type="text"
          name="message"
          id="message"
        />
        <button type="button" class="btn btn-primary" @click="sendMessage">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { io } from "socket.io-client";
import Message from "@/components/Message.vue";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      message: "",
      user: "Leon",
      socket: io("http://localhost:3000"),
    });
    function sendMessage() {
      if (state.message) {
        state.socket.emit("chat message", {
          user: state.user,
          message: state.message,
        });
        state.message = "";
      }
    }
    return { ...toRefs(state), sendMessage };
  },
  components: {
    Message,
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex column;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;

  .chatroom-container {
    display: flex column;
    margin: 10% auto 0 auto;
    height: 100%;
    max-width: 1000px;
    min-height: 500px;
    max-height: 700px;
    border-radius: 10px;

    #chatroom {
      /*background: pink;*/
      height: 90%;
      width: 100%;
    }
    .message-input {
      display: flex;
      height: 5%;
      width: 100%;
      input {
        width: 90%;
      }
      button {
        width: 10%;
      }
    }
  }
}
</style>
