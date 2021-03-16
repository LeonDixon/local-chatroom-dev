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
              v-model="username"
              id="username"
            />
          </div>
          <div v-if="username">
            <router-link :to="{ path: 'Chatroom' }">
              <button type="submit" class="btn submit" @click="submitName">
                Enter
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const state = reactive({
      username: "",
    });

    function submitName() {
      if (state.username != "1") {
        alert("not 1");
      } else {
        alert("1");
      }
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
