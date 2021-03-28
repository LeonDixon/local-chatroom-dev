import {createApp} from 'vue'
import {store, key} from './store/store'
import App from './App.vue'
import router from './router'
import socketio from 'socket.io'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')

