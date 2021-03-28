<template>
  <div class="container">
    <div>
      <h1>Chatroom</h1>
    </div>
    <div class="chatroom-container">
      <div id="chatroom" ref="chatroom">
        <div class="message" v-for="mess in messages" v-bind:key="mess">
          <Message v-bind:message="mess" v-bind:div="chatroom" />
        </div>
      </div>
      <div class="input-group message-input">
        <input
          v-model="message"
          class="form-control"
          type="text"
          name="message"
          id="message"
          @keyup.enter="sendMessage"
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
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onMounted,
  onUpdated,
} from "vue";
import { useStore } from "../store/store";
export default defineComponent({
  setup() {
    const chatroom = ref();
    const store = useStore();
    const messages: Array<string> = [];
    const state = reactive({
      message: "",
      user: store.state.user,
      socket: io("http://localhost:3000"),
      messages: messages,
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

    onMounted(() => {
      state.socket.on("new message", (data) => {
        state.messages.push(data);
      });
      state.socket.on("user connected", (user) => {
        const message = user + " has connected";
        state.messages.push(message);
      });
      state.socket.on("user disconnected", (user) => {
        const message = user + " has disconnected";
        state.messages.push(message);
      });
    });

    onUpdated(() => {
      if (chatroom.value) {
        chatroom.value.scrollTop = chatroom.value.scrollHeight;
      }
    });

    return { ...toRefs(state), chatroom, sendMessage };
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
      overflow-x: hidden;
      overflow-y: scroll;
      height: 90%;
      width: 100%;
      .message {
        text-align: left;
      }
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
