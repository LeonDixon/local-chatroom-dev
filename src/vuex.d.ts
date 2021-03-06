import {ComponentCustomProperties} from 'vue'
import {Store} from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    user: string;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
