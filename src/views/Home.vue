<template>
  <div class="home">
    <div class="" id="login-section">
      <div id="user-login">
        <h4>Please enter a username</h4>
        <div class="form-group">
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              v-model="user"
              id="username"
            />
          </div>
          <div v-if="user" @click="submitName">
            <button type="submit" class="btn submit">Enter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/store";
import { io } from "socket.io-client";
import router from "@/router";
export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      user: store.state.user,
      socket: io("http://localhost:3000"),
      check: false,
    });

    function submitName() {
      const uniqid = Date.now().toString();
      state.socket.emit("check user", uniqid, state.user);
      state.socket.on(uniqid, (res) => {
        if (res) {
          store.commit("setUser", state.user);
          console.log(state.user);
          router.push("/Chatroom");
        } else alert("Name taken");
      });
    }

    return { ...toRefs(state), submitName };
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.home {
  @include fadeIn(2s);
  color: white;
  width: 50%;
  min-height: 100vh;
  max-height: 100vh;
  margin: auto;
  display: flex;
  #login-section {
    width: 500px;
    margin: auto;
    height: 500px;
    display: flex;
    #user-login {
      width: 80%;
      margin: 40% auto 0 auto;
      #username {
        text-align: center;
        border-radius: 5px;
        border: 3px solid $dark-grey;
        padding: 10px;
        width: 70%;
        margin-bottom: 5px;
      }
      .submit {
        background: $chinese-violet !important;
      }
    }
  }
}
</style>
